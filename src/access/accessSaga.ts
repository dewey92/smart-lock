import { takeEvery, delay, call, put, select } from 'redux-saga/effects';
import { getUserById } from '../management';
import { openRoom, resetStatus, loadLogs } from './accessReducer';
import accessApi from './accessApi';

function* openRoomEffect(action: ReturnType<typeof openRoom.started>) {
  yield delay(1000); // Assume opening a door takes 1s

  try {
    const store = yield select();
    const loggedInUser = getUserById(store, action.payload.userId);
    const isAccessGranted = yield call(accessApi.openRoom, action.payload.roomId, loggedInUser);

    if (isAccessGranted) {
      yield put(openRoom.done({ params: action.payload, result: isAccessGranted }));
    } else {
      yield put(openRoom.failed({ params: action.payload, error: {} }));
    }
  } catch (e) {
    yield put(openRoom.failed({ params: action.payload, error: {} }));
  } finally {
    // Refresh current logs
    yield put(loadLogs.started());

    // Then reset the access modal
    yield delay(850); // wait until animation ends
    yield put(resetStatus());
  }
}

function* loadLogsEffect() {
  try {
    const result = yield call(accessApi.loadAccessLogs);
    yield put(loadLogs.done({ result }));
  } catch (e) {
    yield put(loadLogs.failed({ error: {} }));
  }
}

export const accessSagas = [
  takeEvery(openRoom.started.type, openRoomEffect),
  takeEvery(loadLogs.started.type, loadLogsEffect),
];
