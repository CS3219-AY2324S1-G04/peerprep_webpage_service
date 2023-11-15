import { RootState } from '../../context/store'

export const getMatchingStartEpoch = (state: RootState) =>
  state.matching.matchingStartEpoch

export const getMatchingTimeoutEpoch = (state: RootState) =>
  state.matching.matchingTimeoutEpoch
