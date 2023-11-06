import { AxiosError } from 'axios'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

import { toast } from '../../components/Toaster/toast'
import { store } from '../../context/store'
import userService, {
  UserCredential,
  UserDeletionCredential,
} from '../../services/userService'
import { Action, CommonSagaActions } from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { getIsLoggedIn } from './selector'
import {
  removeAccessTokenExpiry,
  setUserProfile,
  updateAccessTokenExpiry,
} from './slice'
import { UserSagaActions } from './types'

const syncIsLoggedInDelayMillis: number = 3000

let lastIsLoggedIn: boolean = false

// Accounts for login and logout in other tabs of the browser
function* periodicallySyncStateWithCookie() {
  while (true) {
    yield put(updateAccessTokenExpiry())
    yield delay(syncIsLoggedInDelayMillis)
  }
}

function* dispatchLoginStateChangeAction() {
  const isLoggedIn: boolean = getIsLoggedIn(store.getState())

  if (lastIsLoggedIn === isLoggedIn) {
    return
  }

  lastIsLoggedIn = isLoggedIn

  if (isLoggedIn) {
    yield put({ type: CommonSagaActions.LOGGED_IN_INIT })
  } else {
    yield put({ type: CommonSagaActions.LOGGED_OUT_TEARDOWN })
  }
}

function* login(action: Action<UserCredential>) {
  yield put(addLoadingTask(UserSagaActions.LOGIN))

  try {
    yield userService.createSession(action.payload)
    yield put(updateAccessTokenExpiry())

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
    yield put(updateAccessTokenExpiry())

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
    yield put(updateAccessTokenExpiry())

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

export function* watchPeriodicallySyncLoginStatusWithCookie() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT],
    periodicallySyncStateWithCookie,
  )
}

export function* watchDispatchLoginStateChangeAction() {
  yield takeLatest(
    [updateAccessTokenExpiry.type, removeAccessTokenExpiry.type],
    dispatchLoginStateChangeAction,
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
    fork(watchPeriodicallySyncLoginStatusWithCookie),
    fork(watchDispatchLoginStateChangeAction),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFetchUserProfile),
    fork(watchDeleteUser),
  ])
}
