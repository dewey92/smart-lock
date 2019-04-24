import uuid from 'uuid/v1';
import * as LS from '../../shared/localStorage';
import { NewRoom, Room, RoomId } from './roomModels';
import { RoomCollectionState } from './roomReducer';

const STORAGE_KEY = 'smartlock__rooms';

/**
 * Abstract over API effects so we could replace it with real data fetching
 * (`fetch`, `axios`, etc) later without changing the Saga implementation.
 */
const api = {
  loadRooms: async () => {
    const store = LS.loadState<RoomCollectionState>(STORAGE_KEY) || {};
    return store;
  },
  addRoom: async (room: NewRoom) => {
    const store = LS.loadState<RoomCollectionState>(STORAGE_KEY) || {};
    const id = uuid();
    const newRoom: Room = { id, name: room.name };

    const newStore = { ...store, [id]: newRoom };
    LS.saveState(STORAGE_KEY, newStore);

    return newRoom;
  },
  editRoom: async (editedRoom: Room) => {
    const store = LS.loadState<RoomCollectionState>(STORAGE_KEY) || {};
    const newStore = { ...store, [editedRoom.id]: editedRoom };
    LS.saveState(STORAGE_KEY, newStore);

    return editedRoom;
  },
  deleteRoom: async (roomId: RoomId) => {
    const store = LS.loadState<RoomCollectionState>(STORAGE_KEY) || {};
    const newStore = Object.keys(store).reduce(
      (acc, curr) => {
        if (curr === roomId) return acc;
        return { ...acc, [curr]: store[curr] };
      },
      {} as RoomCollectionState
    );
    LS.saveState(STORAGE_KEY, newStore);
  },
};

export default api;
