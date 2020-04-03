import { all } from 'redux-saga/effects';
import socketSagas from '../Socket/sagas';
import appSagas from '../App/sagas';
import gameStatusSagas from '../GameStatus/sagas';
import gameToolsSagas from '../GameTools/sagas';

export default function* rootSaga() {
  yield all([
    ...socketSagas,
    ...appSagas,
    ...gameStatusSagas,
    ...gameToolsSagas,
  ]);
}
