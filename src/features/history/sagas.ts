import { all, call, fork, put, takeLatest } from 'redux-saga/effects'

import historyService, {
  Attempt,
  AttemptCount,
} from '../../services/historyService'
import userService from '../../services/userService'
import { CommonSagaActions, SimpleMap } from '../../utils/types'
import { setAttemptsList, setRankingsList } from './slice'
import { HistorySagaActions, Ranking } from './types'

function* getRankings() {
  try {
    const attemptCounts: AttemptCount[] = yield call(
      historyService.getEveryUsersAttempts,
    )
    const userIds: number[] = []
    const rankings: Ranking[] = []

    attemptCounts.forEach((a) => {
      userIds.push(a['user-id'])
    })

    const usernameMap: SimpleMap<string> = yield call(
      userService.getUsernames,
      userIds,
    )

    attemptCounts.forEach((a, index) => {
      rankings.push({
        rank: index + 1,
        username: usernameMap[a['user-id']] ?? '???',
        attemptsCount: a.attempt_count,
      })
    })

    yield put(setRankingsList(rankings))
  } catch (error) {
    console.warn('Retrieving rankings was stripped out for this assignment.')
  }
}

function* getAllUserAttempts() {
  try {
    const attempts: Attempt[] = yield call(historyService.getAllUserAttempts)
    yield put(setAttemptsList(attempts))
  } catch (error) {
    console.warn(
      'Retrieving user attempts was stripped out for this assignment.',
    )
  }
}

export function* watchGetAllUserAttempts() {
  yield takeLatest(
    [
      CommonSagaActions.LOGGED_IN_INIT,
      HistorySagaActions.GET_ALL_USER_ATTEMPTS,
    ],
    getAllUserAttempts,
  )
}

export function* watchGetRankings() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT, HistorySagaActions.GET_RANKINGS],
    getRankings,
  )
}

export const historySaga = function* () {
  yield all([fork(watchGetAllUserAttempts), fork(watchGetRankings)])
}
