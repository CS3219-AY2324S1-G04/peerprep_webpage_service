import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import questionBankReducer from '../features/questionBank/slice'

const middleware = []

middleware.push(createLogger())

export const store = configureStore({
  reducer: {
    questionBank: questionBankReducer,
  },
  middleware,
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
