export interface MatchingState {
  matchingStartEpoch: number
  matchingTimeoutEpoch: number
}

export const MatchingSagaActions = {
  START_CHECK_QUEUE_STATUS: '@matching/START_CHECK_QUEUE_STATUS',
  STOP_CHECK_QUEUE_STATUS: '@matching/STOP_CHECK_QUEUE_STATUS',
  CHECKING_QUEUE_STATUS_QUIETLY: '@matching/CHECKING_QUEUE_STATUS_QUIETLY',
}
