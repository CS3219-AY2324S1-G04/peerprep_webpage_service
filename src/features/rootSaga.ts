import { all, spawn } from 'redux-saga/effects'

import { matchingSaga } from './matching/sagas'
import { questionBankSaga } from './questionBank/sagas'
import { roomSaga } from './room/sagas'
import { userSaga } from './user/sagas'
import { chatSaga } from './chat/sagas'

function* rootSaga() {
  yield all(
    [questionBankSaga, userSaga, matchingSaga, roomSaga, chatSaga].map((saga) =>
      spawn(saga),
    ),
  )
}

export default rootSaga
