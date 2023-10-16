import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CommonState } from './types'

const initialState: CommonState = {
  loadingTasks: {},
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addLoadingTask: (
      state: CommonState,
      { payload: key }: PayloadAction<string>,
    ) => {
      const existingMap = state.loadingTasks
      existingMap[key] = Math.floor(new Date().getTime() / 1000).toString()
      state.loadingTasks = existingMap
    },
    removeLoadingTask: (
      state: CommonState,
      { payload: key }: PayloadAction<string>,
    ) => {
      const existingMap = state.loadingTasks
      delete existingMap[key]
      state.loadingTasks = existingMap
    },
  },
})

export const { addLoadingTask, removeLoadingTask } = commonSlice.actions

export default commonSlice.reducer
