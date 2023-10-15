export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface ServiceResponse {
  status: string
  data: any // eslint-disable-line
  message: string
}

export const CommonSagaActions = {
  APP_INIT: '@common/APP_INIT',
}
