import axios, { AxiosResponse } from 'axios'
import { all, fork, put, select, takeLatest } from 'redux-saga/effects'

import {
  Action,
  CommonSagaActions,
  LoadingKeys,
  ServiceResponse,
} from '../../utils/types'
import { addLoadingTask, removeLoadingTask } from '../common/slice'
import { getFullQuestionMap } from './selectors'
import { addCachedFullQuestion, setCategories, setQuestionsList } from './slice'
import { Question, QuestionBankSagaActions } from './types'

function* getAllQuestions() {
  try {
    const response: AxiosResponse<ServiceResponse> = yield axios.get(
      'http://localhost:9001/question-service/questions',
    )
    yield put(setQuestionsList(response.data.data))
  } catch (error) {
    // TODO: Handle errors properly (e.g. via toast)
    console.error(error)
  }
}

function* getAllCategories() {
  try {
    const response: AxiosResponse<ServiceResponse> = yield axios.get(
      'http://localhost:9001/question-service/categories',
    )
    yield put(setCategories(response.data.data))
  } catch (error) {
    // TODO: Handle errors properly (e.g. via toast)
    console.error(error)
  }
}

function* getSelectedQuestion(action: Action<string>) {
  yield put(addLoadingTask(LoadingKeys.FETCHING_SELECTED_QUESTION))
  try {
    const cachedFullQuestionMap = getFullQuestionMap(yield select())
    const cachedQns = cachedFullQuestionMap[action.payload]
    if (cachedQns) {
      return
    }

    const response: AxiosResponse<ServiceResponse> = yield axios.get(
      `http://localhost:9001/question-service/questions/${action.payload}`,
    )
    const responseQns: Question | null = response.data.data
    if (responseQns) {
      yield put(addCachedFullQuestion(responseQns))
    }
  } catch (error) {
    // TODO: Handle errors properly (e.g. via toast)
    console.error(error)
  } finally {
    yield put(removeLoadingTask(LoadingKeys.FETCHING_SELECTED_QUESTION))
  }
}

export function* watchGetAllQuestions() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT, QuestionBankSagaActions.GET_ALL_QUESTIONS],
    getAllQuestions,
  )
}

export function* watchGetAllCategories() {
  yield takeLatest(
    [CommonSagaActions.APP_INIT, QuestionBankSagaActions.GET_ALL_CATEGORIES],
    getAllCategories,
  )
}

export function* watchGetSelectedQuestion() {
  yield takeLatest(
    QuestionBankSagaActions.SET_SELECTED_QUESTION,
    getSelectedQuestion,
  )
}

export const questionBankSaga = function* () {
  yield all([
    fork(watchGetAllQuestions),
    fork(watchGetAllCategories),
    fork(watchGetSelectedQuestion),
  ])
}
