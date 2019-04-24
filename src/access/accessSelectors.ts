import { ACCESS_REDUCER_KEY, AccessState } from './accessReducer';
import { createSelector } from 'reselect';
import { RoomId, getRoomData, getUserData } from '../management';

export const getLoginStore = state => state[ACCESS_REDUCER_KEY] as AccessState;

export const getLoginAs = createSelector(
  getLoginStore,
  store => store.loginAs
);

export const getAccessModal = createSelector(
  getLoginStore,
  store => store.accessModal
);

export const getAccessModalStatus = createSelector(
  getAccessModal,
  accessModal => accessModal.status
);

export const getAccessLogs = createSelector(
  getLoginStore,
  getRoomData,
  getUserData,
  (store, roomsMap, usersMap) => {
    const logs = Object.values(store.logs);
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    return logs
      .sort((a, b) => b.date.getTime() - a.date.getTime()) // sort by most recent
      .map(log => ({
        id: log.id,
        isGranted: log.isGranted,
        room: roomsMap[log.roomId] ? roomsMap[log.roomId].name : log.roomId,
        user: usersMap[log.userId] ? usersMap[log.userId].name : log.userId,
        date: log.date.toLocaleDateString('en-GB', dateOptions),
      }));
  }
);

/**
 * It will tell each individual room whether access has been granted or rejected.
 * `true` if granted and `false` if rejected. Then it's up to the corresponding door
 * to do what it needs to do, i.e start counting down.
 */
export const mkIsAccessGranted = (roomId: RoomId) =>
  createSelector(
    getAccessModal,
    accessModal => accessModal.roomId === roomId && accessModal.status === 'SUCCESS'
  );
