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
  yield race({
    task: call(loadMatchRoomTask),
    cancel: take(RoomSagaActions.STOP_LOAD_ROOM),
  })
}

function* loadMatchRoomTask() {
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
  yield startMaintainRoomLifetime()
}

function* startMaintainRoomLifetime() {
  yield race({
    task: call(maintainLifetimeTask),
    cancel: take(closeRoom),
  })
}

function* maintainLifetimeTask() {
  try {
    while (true) {
      yield call(keepRoomAlive)
      yield delay(keepAliveIntervalInMs)
    }
  } catch (error) {
    toast.error('Room was closed.')
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
