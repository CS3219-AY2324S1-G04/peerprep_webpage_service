import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Attempt } from '../../services/historyService'
import { HistoryState, Ranking } from './types'

const initialState: HistoryState = {
  attemptsList: [],
  rankingsList: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setAttemptsList: (
      state: HistoryState,
      { payload: attemptsList }: PayloadAction<Attempt[]>,
    ) => {
      state.attemptsList = attemptsList
    },
    setRankingsList: (
      state: HistoryState,
      { payload: rankingsList }: PayloadAction<Ranking[]>,
    ) => {
      state.rankingsList = rankingsList
    },
  },
})

export const { setAttemptsList, setRankingsList } = historySlice.actions

export default historySlice.reducer
