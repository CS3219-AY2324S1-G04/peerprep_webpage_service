import { all, spawn } from 'redux-saga/effects'

import { questionBankSaga } from './questionBank/sagas'

function* rootSaga() {
  yield all([questionBankSaga].map((saga) => spawn(saga)))
}

export default rootSaga
