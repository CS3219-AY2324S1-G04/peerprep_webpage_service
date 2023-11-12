import { NotUndefined } from '@redux-saga/types'
import { EventChannel, eventChannel } from 'redux-saga'
import {
  all,
  call,
  cancelled,
  fork,
  put,
  race,
  take,
  takeLatest,
} from 'redux-saga/effects'
import { Socket, io } from 'socket.io-client'

import { chatServiceBaseUrl } from '../../utils/config'
import { Action } from '../../utils/types'
import {
  pushMessage,
  resetMessages,
  setChannelOff,
  setChannelOn,
  setServerOff,
  setServerOn,
} from './slice'
import {
  ChatSagaActions,
  DraftMessage,
  EmittedEvent,
  Message,
  MessageType,
  ReceivedMessageResponse,
  WsEvent,
} from './types'

let socket: Socket | undefined

// Wrapper functions for socket events (connect, disconnect, reconnect)
function connect(roomId: string, userId: string, username: string) {
  socket = io(chatServiceBaseUrl, {
    query: {
      roomId: roomId,
      userId: userId,
      userName: username,
    },
  })
  console.log(socket)
  return new Promise((resolve) => {
    socket?.on('connect', () => {
      resolve(socket)
      console.log(socket)
    })
  })
}

function createSocketChannel(socket: Socket | undefined) {
  return eventChannel((emit) => {
    const receivedMessageHandler = (payload: ReceivedMessageResponse) => {
      const wsEvent: WsEvent<ReceivedMessageResponse> = {
        type: EmittedEvent.ReceivedMessage,
        payload,
      }
      emit(wsEvent)
    }

    const joinedChatHandler = (payload: string) => {
      const wsEvent: WsEvent<string> = {
        type: EmittedEvent.JoinedChat,
        payload,
      }
      emit(wsEvent)
    }

    const leftChatHandler = (payload: string) => {
      const wsEvent: WsEvent<string> = {
        type: EmittedEvent.LeftChat,
        payload,
      }
      emit(wsEvent)
    }

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason))
    }

    // setup the subscription
    socket?.on(EmittedEvent.ReceivedMessage, receivedMessageHandler)
    socket?.on(EmittedEvent.JoinedChat, joinedChatHandler)
    socket?.on(EmittedEvent.LeftChat, leftChatHandler)
    socket?.on('error', errorHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket?.off('receiveMessage', receivedMessageHandler)
    }

    return unsubscribe
  })
}

function* watchIncomingMessages(
  roomId: string,
  userId: string,
  username: string,
) {
  const connected: Socket = yield call(connect, roomId, userId, username)
  const socketChannel: EventChannel<NotUndefined> = yield call(
    createSocketChannel,
    connected,
  )
  yield put(setChannelOn())
  yield put(setServerOn())

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const event: WsEvent<any> = yield take(socketChannel)
      let messageToPush: Message | undefined

      switch (event.type) {
        case EmittedEvent.ReceivedMessage: {
          const payload: ReceivedMessageResponse = event.payload
          messageToPush = {
            username: payload.userName,
            content: payload.message,
            type: MessageType.Received,
            timestamp: new Date().toISOString(),
          }
          break
        }
        case EmittedEvent.LeftChat:
        case EmittedEvent.JoinedChat: {
          const payload: string = event.payload
          messageToPush = {
            username: 'System',
            content: payload,
            type: MessageType.System,
            timestamp: new Date().toISOString(),
          }
          break
        }
      }

      if (messageToPush) {
        yield put(pushMessage(messageToPush))
      }
    } catch (err) {
      console.error('chat socket error:', err)
    } finally {
      const isCancelled: boolean = yield cancelled()
      if (isCancelled) {
        socket?.disconnect()
        yield put(setServerOff())

        socketChannel.close()
        yield put(setChannelOff())
      }
    }
  }
}

function* handleSendMessage(action: Action<DraftMessage>) {
  const message = action.payload
  socket?.emit('sendMessage', message.content)
  yield put(
    pushMessage({
      username: message.username,
      content: message.content,
      timestamp: message.timestamp,
      type: MessageType.Sent,
    }),
  )
}

function* handleStopChatWsSideEffects() {
  yield put(resetMessages())
}

function* handleStartStopChatWs(
  action: Action<{ roomId: string; userId: string; username: string }>,
) {
  yield race({
    task: call(
      watchIncomingMessages,
      action.payload.roomId,
      action.payload.userId,
      action.payload.username,
    ),
    cancel: take(ChatSagaActions.STOP_ROOM_CHAT_WS),
  })
}

function* watchStartStopChatWs() {
  yield takeLatest(ChatSagaActions.START_ROOM_CHAT_WS, handleStartStopChatWs)
}

function* watchSendMessage() {
  yield takeLatest(ChatSagaActions.SEND_MESSAGE, handleSendMessage)
}

function* watchStopChatWs() {
  yield takeLatest(
    ChatSagaActions.STOP_ROOM_CHAT_WS,
    handleStopChatWsSideEffects,
  )
}

export const chatSaga = function* () {
  yield all([
    fork(watchStartStopChatWs),
    fork(watchSendMessage),
    fork(watchStopChatWs),
  ])
}
