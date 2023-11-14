import axios, { AxiosResponse } from 'axios'
import {
  all,
  call,
  delay,
  fork,
  put,
  race,
  select,
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
import { CommonSagaActions, ServiceResponse } from '../../utils/types'
import { Question } from '../questionBank/types'
import { getRoomStatus } from './selectors'
import { closeRoom, openRoom, setQuestionData, setRoomExpiry } from './slice'
import { RoomSagaActions, RoomStatus } from './types'

const pollRoomIntervalInMs = 3000

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

      const roomStatus: RoomStatus = yield select(getRoomStatus)

      if (roomStatus == RoomStatus.Pending) {
        yield getQuestionData(room.questionId)
        yield put(openRoom(room))
      }

      yield delay(pollRoomIntervalInMs)
    } catch (error) {
      const roomStatus: RoomStatus = yield select(getRoomStatus)

      if (roomStatus == RoomStatus.Open) {
        console.error(`Room closed.`)
        yield put(closeRoom())
      }

      yield delay(pollRoomIntervalInMs)
    }
  }
}

function* onOpenRoom() {
  // Add events to be called when room is open.
  toast.success('Successfully connected to room!')
  yield
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

export function* watchStartPollMatchRoom() {
  yield takeLatest(
    [CommonSagaActions.LOGGED_IN_INIT, RoomSagaActions.START_POLL_MATCH_ROOM],
    startPollMatchRoom,
  )
}

export function* watchOpenRoom() {
  yield takeLatest(openRoom, onOpenRoom)
}

export function* watchStartKeepAlive() {
  yield takeLatest(RoomSagaActions.START_KEEP_ALIVE, startKeepAlive)
}

export const roomSaga = function* () {
  yield all([
    fork(watchStartPollMatchRoom),
    fork(watchOpenRoom),
    fork(watchStartKeepAlive),
  ])
}
