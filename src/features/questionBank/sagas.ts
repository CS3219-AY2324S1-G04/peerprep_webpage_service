import axios, { AxiosResponse } from "axios"
import { all, fork, put, takeLatest } from "redux-saga/effects"
import { CommonSagaActions, ServiceResponse } from "../../utils/types"
import { setCategories, setQuestionsList } from "./slice"
import { QuestionBankSagaActions } from "./types"

function* getAllQuestions() {
  try {
    const response: AxiosResponse<ServiceResponse> = yield axios.get('http://localhost:9001/question-service/questions')
    yield put(setQuestionsList(response.data.data))
  } catch (error) {
    // TODO: Handle errors properly (e.g. via toast)
    console.error(error)
  }
}

function* getAllCategories() {
  try {
    const response: AxiosResponse<ServiceResponse> = yield axios.get('http://localhost:9001/question-service/categories')
    yield put(setCategories(response.data.data))
  } catch (error) {
    // TODO: Handle errors properly (e.g. via toast)
    console.error(error) 
  }
}

export function* watchGetAllQuestions() {
  yield takeLatest([CommonSagaActions.APP_INIT, QuestionBankSagaActions.GET_ALL_QUESTIONS], getAllQuestions)
}

export function* watchGetAllCategories() {
  yield takeLatest([CommonSagaActions.APP_INIT, QuestionBankSagaActions.GET_ALL_CATEGORIES], getAllCategories)

}

export const questionBankSaga = function* () {
  yield all([
    fork(watchGetAllQuestions),
    fork(watchGetAllCategories),
  ])
}