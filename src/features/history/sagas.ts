import { all, call, fork, put, takeLatest } from 'redux-saga/effects'

import { toast } from '../../components/Toaster/toast'
import historyService, { Attempt } from '../../services/historyService'
import { CommonSagaActions } from '../../utils/types'
import { QuestionBankSagaActions } from '../questionBank/types'
import { setAttemptsList } from './slice'

function* getAllUserAttempts() {
  try {
    const attempts: Attempt[] = yield call(historyService.getAllUserAttempts)
    yield put(setAttemptsList(attempts))
  } catch (error) {
    toast.error(
      'Error trying to retrieve your attempts. Please try again later.',
    )
  }
}

export function* watchGetAllUserAttempts() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT, QuestionBankSagaActions.GET_ALL_QUESTIONS],
    getAllUserAttempts,
  )
}

export const historySaga = function* () {
  yield all([fork(watchGetAllUserAttempts)])
}
