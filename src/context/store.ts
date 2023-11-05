import { Middleware, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import commonReducer from '../features/common/slice'
import questionBankReducer from '../features/questionBank/slice'
import roomReducer from '../features/room/slice'
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
    questionBank: questionBankReducer,
    user: userReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extraMiddlewares),
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
