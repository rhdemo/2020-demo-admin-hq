import { all } from 'redux-saga/effects';
import socketSagas from '../Socket/sagas';
import appSagas from '../App/sagas';
import mainSagas from '../Home/sagas';

export default function* rootSaga() {
  yield all([
    ...socketSagas,
    ...appSagas,
    ...mainSagas
  ]);
}
