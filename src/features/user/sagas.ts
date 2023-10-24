import { AxiosError } from 'axios'
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects'

import { toast } from '../../components/Toaster/toast'
import { store } from '../../context/store'
import userService, {
  UserCredential,
  UserDeletionCredential,
} from '../../services/userService'
import { Action, CommonSagaActions } from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { getIsLoggedIn } from './selector'
import { setIsLoggedIn, setUserProfile } from './slice'
import { UserSagaActions, cookieIsLoggedInKey } from './types'

const syncIsLoggedInDelayMillis: number = 1000
const validateSessionDelayMillis: number = 30000

function* periodicallySyncIsLoggedInCookie() {
  while (true) {
    const currIsLoggedIn: boolean = getIsLoggedIn(store.getState())
    const correctIsLoggedIn: boolean = document.cookie.includes(
      `${cookieIsLoggedInKey}=true`,
    )

    if (currIsLoggedIn !== correctIsLoggedIn) {
      yield put(setIsLoggedIn(correctIsLoggedIn))
    }

    yield delay(syncIsLoggedInDelayMillis)
  }
}

function* initLoggedInUser(action: Action<boolean>) {
  const isLoggedIn: boolean = action.payload
  if (isLoggedIn) {
    yield put({ type: CommonSagaActions.LOGGED_IN_INIT })
  }
}

function* keepSessionAlive() {
  try {
    yield userService.keepSessionAlive()
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error('Session has been revoked.')
      yield put(setIsLoggedIn(false))
    }
  }
}

// Ensures that if the session is revoked from anywhere other than the the
// browser the app is running in (e.g. revoked by the server), the app will be
// able to handle it.
// TODO: Come up with a better way to handle this other than frequent polling.
function* periodicallyValidateSession() {
  while (true) {
    if (!getIsLoggedIn(store.getState())) {
      return
    }

    yield call(keepSessionAlive)
    yield delay(validateSessionDelayMillis)
  }
}

function* login(action: Action<UserCredential>) {
  yield put(addLoadingTask(UserSagaActions.LOGIN))

  try {
    yield userService.createSession(action.payload)
    yield put(setIsLoggedIn(true))

    toast.success('Login successful.')
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 400)
    ) {
      toast.error('Login failed: Invalid username and/or password.')
    } else {
      toast.error('Login failed: Please try again later.')
    }
  } finally {
    yield put(removeLoadingTask(UserSagaActions.LOGIN))
  }
}

function* logout() {
  yield put(addLoadingTask(UserSagaActions.LOGOUT))

  try {
    yield userService.deleteSession()
    yield put(setIsLoggedIn(false))

    toast.success('Logout successful.')
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(`Logout failed: ${error.response?.data}`)
    } else {
      toast.error('Logout failed: Please try again later.')
    }
  } finally {
    yield put(removeLoadingTask(UserSagaActions.LOGOUT))
  }
}

function* fetchUserProfile() {
  yield put(addLoadingTask(UserSagaActions.FETCH_USER_PROFILE))

  try {
    yield put(setUserProfile(yield userService.fetchUserProfile()))
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(`Fetching user profile failed: ${error.response?.data}`)
    } else {
      toast.error('Fetching user profile failed: Please try again later.')
    }

    console.error(error)
  } finally {
    yield put(removeLoadingTask(UserSagaActions.FETCH_USER_PROFILE))
  }
}

function* deleteUser(action: Action<UserDeletionCredential>) {
  yield put(addLoadingTask(UserSagaActions.DELETE_USER))

  try {
    yield userService.deleteUser(action.payload)
    yield put(setIsLoggedIn(false))

    toast.success('User deleted.')
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(`User deletion failed: ${error.response?.data}`)
    } else {
      toast.error('User deletion failed: Please try again later.')
    }
  } finally {
    yield put(removeLoadingTask(UserSagaActions.DELETE_USER))
  }
}

export function* watchPeriodicallySyncIsLoggedInCookie() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT],
    periodicallySyncIsLoggedInCookie,
  )
}

export function* watchInitLoggedInUser() {
  yield takeLatest([setIsLoggedIn.type], initLoggedInUser)
}

export function* watchKeepSessionAlive() {
  yield takeLatest([CommonSagaActions.LOGGED_IN_INIT], keepSessionAlive)
}

export function* watchPeriodicallyValidateSession() {
  yield takeLatest(
    [CommonSagaActions.LOGGED_IN_INIT],
    periodicallyValidateSession,
  )
}

export function* watchLogin() {
  yield takeLatest([UserSagaActions.LOGIN], login)
}

export function* watchLogout() {
  yield takeLatest([UserSagaActions.LOGOUT], logout)
}

export function* watchFetchUserProfile() {
  yield takeLatest(
    [CommonSagaActions.LOGGED_IN_INIT, UserSagaActions.FETCH_USER_PROFILE],
    fetchUserProfile,
  )
}

export function* watchDeleteUser() {
  yield takeLatest([UserSagaActions.DELETE_USER], deleteUser)
}

export function* userSaga() {
  yield all([
    fork(watchPeriodicallySyncIsLoggedInCookie),
    fork(watchInitLoggedInUser),
    fork(watchKeepSessionAlive),
    fork(watchPeriodicallyValidateSession),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFetchUserProfile),
    fork(watchDeleteUser),
  ])
}
