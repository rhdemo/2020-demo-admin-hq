import { all } from 'redux-saga/effects';
import socketSagas from '../Socket/sagas';
import appSagas from '../App/sagas';
import homeSagas from '../Home/sagas';
import gameStatusSagas from '../GameStatus/sagas';
import gameToolsSagas from '../GameTools/sagas';
import botsSagas from '../Bots/sagas';

export default function* rootSaga() {
  yield all([
    ...socketSagas,
    ...appSagas,
    ...homeSagas,
    ...gameStatusSagas,
    ...gameToolsSagas,
    ...botsSagas,
  ]);
}
