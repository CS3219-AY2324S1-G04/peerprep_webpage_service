import { Attempt } from '../../services/historyService'

export interface HistoryState {
  attemptsList: Attempt[]
}

export const HistorySagaActions = {
  GET_ALL_USER_ATTEMPTS: '@history/GET_ALL_USER_ATTEMPTS',
}
