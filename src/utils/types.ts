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
  APP_LOGGED_IN_INIT: '@common/APP_LOGGED_IN_INIT',
}

export const LoadingKeys = {
  FETCHING_SELECTED_QUESTION: '@loading/FETCHING_SELECTED_QUESTION',
}
