import { takeEvery, delay, call, put } from 'redux-saga/effects';
import { loadUsers, addUser, editUser, deleteUser } from './userReducer';
import userApi from './userApi';
import { deleteRoom } from '../rooms';

function* loadUsersEffect() {
  yield delay(500); // Assume real api

  try {
    const result = yield call(userApi.loadUsers);
    yield put(loadUsers.done({ result }));
  } catch (e) {
    yield put(loadUsers.failed({ error: {} })); // ignore error for now
  }
}

function* addUserEffect(action: ReturnType<typeof addUser.started>) {
  yield delay(500); // Assume real api

  try {
    const result = yield call(userApi.addUser, action.payload);
    yield put(addUser.done({ params: action.payload, result }));
  } catch (e) {
    yield put(addUser.failed({ params: action.payload, error: {} }));
  }
}

function* editUserEffect(action: ReturnType<typeof editUser.started>) {
  try {
    const result = yield call(userApi.editUser, action.payload);
    yield put(editUser.done({ params: action.payload, result }));
  } catch (e) {
    yield put(editUser.failed({ params: action.payload, error: {} }));
  }
}

function* deleteUserEffect(action: ReturnType<typeof deleteUser.started>) {
  yield delay(500); // Assume real api

  try {
    yield call(userApi.deleteUser, action.payload);
    yield put(deleteUser.done({ params: action.payload, result: undefined }));
  } catch (e) {
    yield put(deleteUser.failed({ params: action.payload, error: {} }));
  }
}

function* deleteRoomEffect(action: ReturnType<typeof deleteUser.started>) {
  yield delay(100); // Assume real api
  yield call(userApi.deleteRoom, action.payload);
}

export const userSagas = [
  takeEvery(loadUsers.started.type, loadUsersEffect),
  takeEvery(addUser.started.type, addUserEffect),
  takeEvery(editUser.started.type, editUserEffect),
  takeEvery(deleteUser.started.type, deleteUserEffect),
  takeEvery(deleteRoom.started.type, deleteRoomEffect),
];
