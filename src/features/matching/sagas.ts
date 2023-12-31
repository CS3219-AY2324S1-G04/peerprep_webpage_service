import { AxiosError } from 'axios'
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
import matchingService from '../../services/matchingService'
import { CommonSagaActions, LoadingKeys } from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { MatchingSagaActions } from './types'

const queueStatusCheckDelayMillis: number = 5000

function* checkUserQueueStatus() {
  try {
    yield matchingService.checkUserQueueStatus()
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 303) {
        yield put(addLoadingTask(LoadingKeys.REDIRECT_TO_ROOM))
      }
      if (error.response?.status === 401) {
        toast.error(`Queue status error: ${error.response.data.data.message}`)
      }
      if (error.response?.status === 404) {
        toast.error(
          'Queue error: Unable to find a room at this time. Please try again later.',
        )
      }
      if (error.response?.status === 500) {
        toast.error('Queue status error: Server issues')
      }
      yield put(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
      yield put({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
    }
  }
}

function* checkUserQueueStatusQuietly() {
  try {
    yield matchingService.checkUserQueueStatus()
    yield put({ type: MatchingSagaActions.START_CHECK_QUEUE_STATUS })
    yield put(addLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
  } catch (error) {
    // background task just to check, no toast needed
    console.error(error)
  }
}

function* periodicallyCheckQueueStatus() {
  while (true) {
    yield call(checkUserQueueStatus)
    yield delay(queueStatusCheckDelayMillis)
  }
}

function* watchPeriodicallyCheckQueueStatus() {
  yield takeLatest(MatchingSagaActions.START_CHECK_QUEUE_STATUS, function* () {
    yield race({
      task: call(periodicallyCheckQueueStatus),
      cancel: take(MatchingSagaActions.STOP_CHECK_QUEUE_STATUS),
    })
  })
}

function* watchCheckUserQueueStatusQuietly() {
  yield takeLatest(
    [
      CommonSagaActions.LOGGED_IN_INIT,
      MatchingSagaActions.CHECKING_QUEUE_STATUS_QUIETLY,
    ],
    checkUserQueueStatusQuietly,
  )
}

export function* matchingSaga() {
  yield all([
    fork(watchPeriodicallyCheckQueueStatus),
    fork(watchCheckUserQueueStatusQuietly),
  ])
}
