export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface ServiceResponse {
  status: string
  data: any // eslint-disable-line
  message: string
}
export interface Action<T> {
  payload: T
  type: string
}

export interface SimpleMap<V = string> {
  [index: string]: V
}

export const CommonSagaActions = {
  APP_INIT: '@common/APP_INIT',
  LOGGED_IN_INIT: '@common/LOGGED_IN_INIT',
  LOGGED_OUT_TEARDOWN: '@common/LOGGED_OUT_TEARDOWN',
}

export const LoadingKeys = {
  FETCHING_SELECTED_QUESTION: '@loading/FETCHING_SELECTED_QUESTION',
  CHECKING_QUEUE_STATUS: '@loading/CHECKING_QUEUE_STATUS'
}
