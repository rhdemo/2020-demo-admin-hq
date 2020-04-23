import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage } from '../Socket/actions';
import { RESET_GAME } from './actions';
import { OUTGOING_MESSAGE_TYPES } from '../Socket/messageTypes';


function* executeResetGame(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.RESET_GAME,
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchResetGame() {
  yield takeLatest(RESET_GAME, executeResetGame);
}

export default [
  watchResetGame()
];