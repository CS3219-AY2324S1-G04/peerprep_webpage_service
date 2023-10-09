import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import loginStatusReducer from '../features/loginStatus/slice'
import questionBankReducer from '../features/questionBank/slice'

const extraMiddlewares: Middleware[] = []
extraMiddlewares.push(createLogger())

export const store = configureStore({
  reducer: {
    questionBank: questionBankReducer,
    loginStatus: loginStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extraMiddlewares),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
