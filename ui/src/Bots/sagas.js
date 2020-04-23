import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage } from '../Socket/actions';
import { SEND_BOT_PING, UPDATE_BOT_CONFIG } from './actions';
import { OUTGOING_MESSAGE_TYPES } from '../Socket/messageTypes';

function* executeSendBotPing(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.BOT_PING,
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchSendBotPing() {
  yield takeLatest(SEND_BOT_PING, executeSendBotPing);
}

function* executeUpdateBotConfig(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.BOT_CONFIG,
    method: action.payload.method,
    botConfig: action.payload.botConfig,
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchUpdateBotConfig() {
  yield takeLatest(UPDATE_BOT_CONFIG, executeUpdateBotConfig);
}

export default [
  watchSendBotPing(),
  watchUpdateBotConfig()
];