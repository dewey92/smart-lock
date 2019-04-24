import { takeEvery, put } from 'redux-saga/effects';
import { loadRooms, loadUsers } from '../management';
import { initApp } from './appReducer';
import { loadLogs } from '../access';

function* initEffect() {
  yield put(loadRooms.started());
  yield put(loadUsers.started());
  yield put(loadLogs.started());
}

export const appSagas = [takeEvery(initApp, initEffect)];
