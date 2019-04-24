import { all } from 'redux-saga/effects';
import { roomSagas, userSagas } from './management';
import { appSagas } from './app/appSaga';
import { accessSagas } from './access';

export default function* rootSaga() {
  yield all([...roomSagas, ...userSagas, ...accessSagas, ...appSagas]);
}
