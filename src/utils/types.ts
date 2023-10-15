export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

export interface ServiceResponse {
  status: string
  data: any
  message: string
}

export const CommonSagaActions = {
  APP_INIT: '@common/APP_INIT'
}
