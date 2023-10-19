import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import commonReducer from '../features/common/slice'
import configReducer from '../features/config/slice'
import questionBankReducer from '../features/questionBank/slice'
import rootSaga from '../features/rootSaga'
import userReducer from '../features/user/slice'

const extraMiddlewares: Middleware[] = []

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

extraMiddlewares.push(logger)
extraMiddlewares.push(sagaMiddleware)

export const store = configureStore({
  reducer: {
    common: commonReducer,
    config: configReducer,
    questionBank: questionBankReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extraMiddlewares),
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
