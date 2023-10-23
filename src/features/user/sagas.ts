import { AxiosError } from 'axios'
import { all, fork, put, takeLatest } from 'redux-saga/effects'

import { toast } from '../../components/Toaster/toast'
import userService, {
  UserCredential,
  UserDeletionCredential,
} from '../../services/userService'
import { Action, CommonSagaActions } from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { setIsLoggedIn, setUserProfile } from './slice'
import { UserSagaActions, cookieIsLoggedInKey } from './types'

function* initIsLoggedIn() {
  yield put(
    setIsLoggedIn(document.cookie.includes(`${cookieIsLoggedInKey}=true`)),
  )
}

function* initLoggedInUser(action: Action<boolean>) {
  const isLoggedIn: boolean = action.payload
  if (isLoggedIn) {
    yield put({ type: CommonSagaActions.LOGGED_IN_INIT })
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

export function* watchInitIsLoggedIn() {
  yield takeLatest([CommonSagaActions.APP_INIT], initIsLoggedIn)
}

export function* watchInitLoggedInUser() {
  yield takeLatest([setIsLoggedIn.type], initLoggedInUser)
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
    fork(watchInitIsLoggedIn),
    fork(watchInitLoggedInUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFetchUserProfile),
    fork(watchDeleteUser),
  ])
}
