import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import commonReducer from '../features/common/slice'
import questionBankReducer from '../features/questionBank/slice'
import userInfoReducer from '../features/userInfo/slice'
import rootSaga from '../features/rootSaga'

const extraMiddlewares: Middleware[] = []
extraMiddlewares.push(createLogger())

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

middleware.push(logger)
middleware.push(sagaMiddleware)

export const store = configureStore({
  reducer: {
    common: commonReducer,
    questionBank: questionBankReducer,
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extraMiddlewares),
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
