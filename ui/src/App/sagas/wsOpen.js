import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage, WS_OPEN } from '../../Socket/actions';
import { OUTGOING_MESSAGE_TYPES} from '../../Socket/messageTypes';

function* executeSendInit(action) {
  yield put(sendOutgoingMessage({type: OUTGOING_MESSAGE_TYPES.INIT}));
}

export function* watchWsOpen() {
  yield takeLatest(WS_OPEN, executeSendInit);
}
