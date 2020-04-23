import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage, WS_OPEN } from '../../Socket/actions';
import { OUTGOING_MESSAGE_TYPES } from '../../Socket/messageTypes';
import { SEND_AUTH_CHECK } from '../../Home/actions';

function* executeSendInit(action) {
  const username = localStorage.getItem('username') || undefined;
  const password = localStorage.getItem('password') || undefined;
  if (username && password) {
    yield put({
      type: SEND_AUTH_CHECK,
      payload: {username, password}
    });
  }

  yield put(sendOutgoingMessage({type: OUTGOING_MESSAGE_TYPES.INIT}));
}

export function* watchWsOpen() {
  yield takeLatest(WS_OPEN, executeSendInit);
}
