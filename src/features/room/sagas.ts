import axios, { AxiosResponse } from 'axios'
import {
  all,
  call,
  delay,
  fork,
  put,
  race,
  take,
  takeLatest,
} from 'redux-saga/effects'

import { toast } from '../../components/Toaster/toast'
import {
  RoomModel,
  getMatchedRoom,
  keepAlive,
} from '../../services/roomService'
import config from '../../utils/config'
import { ServiceResponse } from '../../utils/types'
import { Question } from '../questionBank/types'
import { closeRoom, openRoom, setQuestionData, setRoomExpiry } from './slice'
import { RoomSagaActions } from './types'

const retryFindMatchRoomDelayInMs = 3000

function* startPollMatchRoom() {
  yield race({
    task: call(pollMatchRoom),
    cancel: take(RoomSagaActions.STOP_POLL_MATCH_ROOM),
  })
}

function* pollMatchRoom() {
  while (true) {
    try {
      const room: RoomModel = yield getMatchedRoom()

      if (room == null) {
        throw new Error('Room not found!')
      }

      yield getQuestionData(room.questionId)

      toast.success('Successfully connected to room!')
      yield put(openRoom(room))
    } catch (error) {
      console.error(`Match room not found! Retrying...`)
      toast.error('Connecting to room...')
      yield delay(retryFindMatchRoomDelayInMs)
    }
  }
}

function* onOpenRoom() {
  // Add events to be called when room is open.
}

function* startKeepAlive() {
  yield race({
    task: call(maintainKeepAlive),
    cancel: take([closeRoom, RoomSagaActions.STOP_KEEP_ALIVE]),
  })
}

function* maintainKeepAlive() {
  try {
    while (true) {
      const expiry: Date = yield call(keepAlive)
      yield put(setRoomExpiry(expiry.toTimeString()))

      // Send next keep alive after half the time to expiry.
      const keepAliveDelay = (expiry.getTime() - Date.now()) / 2

      if (keepAliveDelay < 0) {
        throw new Error('Room expired')
      }

      yield delay(keepAliveDelay)
    }
  } catch (error) {
    toast.error('Room was closed.')
    yield put(closeRoom())
  }
}

function* getQuestionData(questionId: string) {
  const res: AxiosResponse<ServiceResponse> = yield axios.get(
    `${config.questionServiceBaseUrl}/questions/${questionId}`,
  )

  const question: Question = res.data.data
  yield put(setQuestionData(question))
}

export function* watchLoadMatchRoom() {
  yield takeLatest(RoomSagaActions.START_POLL_MATCH_ROOM, startPollMatchRoom)
}

export function* watchOpenRoom() {
  yield takeLatest(openRoom, onOpenRoom)
}

export function* watchStartKeepAlive() {
  yield takeLatest(RoomSagaActions.START_KEEP_ALIVE, startKeepAlive)
}

export const roomSaga = function* () {
  yield all([
    fork(watchLoadMatchRoom),
    fork(watchOpenRoom),
    fork(watchStartKeepAlive),
  ])
}
