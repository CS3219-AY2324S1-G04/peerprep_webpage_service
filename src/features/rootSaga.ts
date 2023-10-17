import { all, spawn } from 'redux-saga/effects'

import { questionBankSaga } from './questionBank/sagas'
import { userSaga } from './user/sagas'

function* rootSaga() {
  yield all([questionBankSaga, userSaga].map((saga) => spawn(saga)))
}

export default rootSaga
