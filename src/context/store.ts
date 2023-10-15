import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import questionBankReducer from '../features/questionBank/slice'
import rootSaga from '../features/rootSaga'

const middleware: Middleware[] = []

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

middleware.push(logger)
middleware.push(sagaMiddleware)

export const store = configureStore({
  reducer: {
    questionBank: questionBankReducer,
  },
  middleware,
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
