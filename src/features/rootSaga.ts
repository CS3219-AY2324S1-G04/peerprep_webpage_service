import { all, spawn } from 'redux-saga/effects'

import { chatSaga } from './chat/sagas'
import { historySaga } from './history/sagas'
import { matchingSaga } from './matching/sagas'
import { questionBankSaga } from './questionBank/sagas'
import { roomSaga } from './room/sagas'
import { userSaga } from './user/sagas'

function* rootSaga() {
  yield all(
    [
      questionBankSaga,
      userSaga,
      matchingSaga,
      roomSaga,
      chatSaga,
      historySaga,
    ].map((saga) => spawn(saga)),
  )
}

export default rootSaga
