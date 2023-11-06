import { AxiosError, AxiosResponse } from 'axios'
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
import { LoadingKeys } from '../../utils/types'
import { removeLoadingTask } from '../common/slice'
import { MatchingSagaActions } from './types'

const queueStatusCheckDelayMillis: number = 5000

function* checkUserQueueStatus() {
  try {
    yield matchingService.checkUserQueueStatus()
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 303) {
        toast.success('Successfully matched!')
        yield put(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
        yield put({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
      }
      if (error.response?.status === 401) {
        toast.error(`Queue status error: ${error.response.data.data.message}`)
        yield put(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
        yield put({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
      }
      if (error.response?.status === 404) {
        toast.error(
          'Queue error: Unable to find a room at this time. Please try again later.',
        )
        yield put(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
        yield put({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
      }
      if (error.response?.status === 500) {
        toast.error('Queue status error: Server issues')
      }
      // yield put(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
      // yield put({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
    }
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

export function* matchingSaga() {
  yield all([fork(watchPeriodicallyCheckQueueStatus)])
}
