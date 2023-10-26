import { all, spawn } from 'redux-saga/effects'

import { questionBankSaga } from './questionBank/sagas'
import { userSaga } from './user/sagas'
import { matchingSaga } from './matching/sagas'

function* rootSaga() {
  yield all([questionBankSaga, userSaga, matchingSaga].map((saga) => spawn(saga)))
}

export default rootSaga
