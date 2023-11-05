import axios, { AxiosResponse } from 'axios'
import { Task } from 'redux-saga'
import {
  all,
  call,
  cancel,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects'

import {
  RoomModel,
  getMatchedRoom,
  keepRoomAlive,
} from '../../services/roomService'
import config from '../../utils/config'
import { ServiceResponse } from '../../utils/types'
import { Question } from '../questionBank/types'
import { closeRoom, openRoom, setQuestionData } from './slice'
import { RoomSagaActions } from './types'

const keepAliveIntervalInMs = 5000
const retryFindMatchRoomDelayInMs = 3000

function* startLoadMatchRoom() {
  const loadRoomTask: Task = yield fork(loadMatchRoomTask)
  yield take(RoomSagaActions.STOP_LOAD_ROOM)
  yield cancel(loadRoomTask)
}

function* loadMatchRoomTask() {
  while (true) {
    try {
      const room: RoomModel = yield getMatchedRoom()

      if (room == null) {
        throw new Error('Room not found!')
      }

      yield getQuestionData(room.questionId)

      yield put(openRoom(room))
    } catch (error) {
      console.error(`Match room not found! Retrying...`)
      yield delay(retryFindMatchRoomDelayInMs)
    }
  }
}

function* onOpenRoom() {
  yield startMaintainRoomLifetime()
}

function* startMaintainRoomLifetime() {
  const task: Task = yield fork(maintainLifetimeTask)
  yield take(closeRoom)
  yield cancel(task)
}

function* maintainLifetimeTask() {
  try {
    while (true) {
      yield call(keepRoomAlive)
      yield delay(keepAliveIntervalInMs)
    }
  } catch (error) {
    console.error('Failed to keep room alive')
    yield delay(keepAliveIntervalInMs)
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
  yield takeLatest(RoomSagaActions.LOAD_MATCH_ROOM_DATA, startLoadMatchRoom)
}

export function* watchOpenRoom() {
  yield takeLatest(openRoom, onOpenRoom)
}

export const roomSaga = function* () {
  yield all([fork(watchLoadMatchRoom), fork(watchOpenRoom)])
}
