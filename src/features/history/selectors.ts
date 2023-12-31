import { RootState } from '../../context/store'

export const getAllUserAttempts = (state: RootState) =>
  state.history.attemptsList

export const getRankings = (state: RootState) => state.history.rankingsList
