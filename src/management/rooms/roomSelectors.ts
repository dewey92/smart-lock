import { ROOM_REDUCER_KEY, RoomCollectionState } from './roomReducer';
import { createSelector } from 'reselect';
import { RemoteData } from '../managementCrudHelpers';

export const getRoomStore = state => state[ROOM_REDUCER_KEY] as RemoteData<RoomCollectionState>;

export const getRoomData = createSelector(
  getRoomStore,
  store => store.data
);

export const getRoomRemoteStatus = createSelector(
  getRoomStore,
  store => store.status
);

export const getRooms = createSelector(
  getRoomData,
  data => Object.values(data)
);
