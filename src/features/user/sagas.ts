import { AxiosError } from 'axios'
import { all, fork, put, takeLatest } from 'redux-saga/effects'

import { store } from '../../context/store'
import userService, { LoginCredential } from '../../services/userService'
import { Action, CommonSagaActions } from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { getIsLoggedIn } from './selector'
import { setUserProfile, updateIsLoggedIn } from './slice'
import { UserSagaActions } from './types'

function* initLoggedIn() {
  if (getIsLoggedIn(store.getState())) {
    yield put({ type: CommonSagaActions.LOGGED_IN_INIT })
  }
}

function* createSession(action: Action<LoginCredential>) {
  yield put(addLoadingTask(UserSagaActions.CREATE_SESSION))

  try {
    yield userService.createSession(action.payload)
    yield put(updateIsLoggedIn())
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 400)
    ) {
      // TODO: Show toast / snackbar containing error message
      console.error('Invalid username and/or password.')
    } else {
      // TODO: Show toast / snackbar containing error message
      console.error('Sorry, please try again later.')
    }

    console.error(error)
  } finally {
    yield put(removeLoadingTask(UserSagaActions.CREATE_SESSION))
  }
}

function* getUserProfile() {
  yield put(addLoadingTask(UserSagaActions.GET_USER_PROFILE))

  try {
    yield put(setUserProfile(yield userService.getUserProfile()))
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      yield put(updateIsLoggedIn())

      // TODO: Show toast / snackbar containing error message
      console.error('Session has been revoked.')
    } else {
      // TODO: Show toast / snackbar containing error message
      console.error('Sorry, please try again later.')
    }

    console.error(error)
  } finally {
    yield put(removeLoadingTask(UserSagaActions.GET_USER_PROFILE))
  }
}

export function* watchInitLoggedIn() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT, updateIsLoggedIn.type],
    initLoggedIn,
  )
}

export function* watchCreateSession() {
  yield takeLatest([UserSagaActions.CREATE_SESSION], createSession)
}

export function* watchGetUserProfile() {
  yield takeLatest(
    [CommonSagaActions.LOGGED_IN_INIT, UserSagaActions.GET_USER_PROFILE],
    getUserProfile,
  )
}

export function* userSaga() {
  yield all([
    fork(watchInitLoggedIn),
    fork(watchCreateSession),
    fork(watchGetUserProfile),
  ])
}
