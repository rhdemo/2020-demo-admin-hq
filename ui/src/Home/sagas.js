import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage } from '../Socket/actions';
import { SEND_AUTH_CHECK } from './actions';
import { OUTGOING_MESSAGE_TYPES } from '../Socket/messageTypes';

function* executeSendAuth(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.AUTH_CHECK,
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchSendAuth() {
  yield takeLatest(SEND_AUTH_CHECK, executeSendAuth);
}

export default [
  watchSendAuth()
];