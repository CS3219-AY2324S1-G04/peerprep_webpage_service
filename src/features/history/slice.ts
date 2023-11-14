import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Attempt } from '../../services/historyService'
import { HistoryState } from './types'

const initialState: HistoryState = {
  attemptsList: [],
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
  },
})

export const { setAttemptsList } = historySlice.actions

export default historySlice.reducer
