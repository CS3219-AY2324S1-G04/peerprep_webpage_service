import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import questionBankReducer from '../features/questionBank/slice'
import userInfoReducer from '../features/userInfo/slice'

const extraMiddlewares: Middleware[] = []
extraMiddlewares.push(createLogger())

export const store = configureStore({
  reducer: {
    questionBank: questionBankReducer,
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extraMiddlewares),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
