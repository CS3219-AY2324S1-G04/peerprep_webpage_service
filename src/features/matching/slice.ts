import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MatchingState } from './types'

const initialState: MatchingState = {
  matchingStartEpoch: 0,
  matchingTimeoutEpoch: 0,
}

const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    updateMatchingEpoch: (
      state,
      action: PayloadAction<
        { startEpoch: number; timeoutEpoch: number } | undefined
      >,
    ) => {
      state.matchingStartEpoch = action.payload?.startEpoch ?? 0
      state.matchingTimeoutEpoch = action.payload?.timeoutEpoch ?? 0
    },
  },
})

export const { updateMatchingEpoch } = matchingSlice.actions

export default matchingSlice.reducer
