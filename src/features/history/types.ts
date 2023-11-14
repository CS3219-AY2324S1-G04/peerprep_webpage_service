import { Attempt } from '../../services/historyService'
import { Question } from '../questionBank/types'

export interface HistoryState {
  attemptsList: Attempt[]
}

export interface AttemptRow {
  date: string
  attemptId: string
  questionTitle: string
  language: string
  attempt: Attempt
  question: Question
}

export const HistorySagaActions = {
  GET_ALL_USER_ATTEMPTS: '@history/GET_ALL_USER_ATTEMPTS',
}
