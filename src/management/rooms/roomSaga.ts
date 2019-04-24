import { takeEvery, delay, call, put } from 'redux-saga/effects';
import { loadRooms, addRoom, editRoom, deleteRoom } from './roomReducer';
import roomApi from './roomApi';

function* loadRoomsEffect() {
  yield delay(500); // Assume real api

  try {
    const result = yield call(roomApi.loadRooms);
    yield put(loadRooms.done({ result }));
  } catch (e) {
    yield put(loadRooms.failed({ error: {} })); // ignore error for now
  }
}

function* addRoomEffect(action: ReturnType<typeof addRoom.started>) {
  yield delay(500); // Assume real api

  try {
    const result = yield call(roomApi.addRoom, action.payload);
    yield put(addRoom.done({ params: action.payload, result }));
  } catch (e) {
    yield put(addRoom.failed({ params: action.payload, error: {} }));
  }
}

function* editRoomEffect(action: ReturnType<typeof editRoom.started>) {
  yield delay(500); // Assume real api

  try {
    const result = yield call(roomApi.editRoom, action.payload);
    yield put(editRoom.done({ params: action.payload, result }));
  } catch (e) {
    yield put(editRoom.failed({ params: action.payload, error: {} }));
  }
}

function* deleteRoomEffect(action: ReturnType<typeof deleteRoom.started>) {
  yield delay(500); // Assume real api

  try {
    yield call(roomApi.deleteRoom, action.payload);
    yield put(deleteRoom.done({ params: action.payload, result: undefined }));
  } catch (e) {
    yield put(deleteRoom.failed({ params: action.payload, error: {} }));
  }
}

export const roomSagas = [
  takeEvery(loadRooms.started.type, loadRoomsEffect),
  takeEvery(addRoom.started.type, addRoomEffect),
  takeEvery(editRoom.started.type, editRoomEffect),
  takeEvery(deleteRoom.started.type, deleteRoomEffect),
];
