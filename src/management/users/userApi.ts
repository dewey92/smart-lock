import uuid from 'uuid/v1';
import * as LS from '../../shared/localStorage';
import { NewUser, User, UserId } from './userModels';
import { UsersCollectionState } from './userReducer';
import { RoomId } from '../rooms';

const STORAGE_KEY = 'smartlock__users';

/**
 * Abstract over API effects so we could replace it with real data fetching
 * (`fetch`, `axios`, etc) later without changing the Saga implementation.
 */
const api = {
  loadUsers: async () => {
    const store = LS.loadState<UsersCollectionState>(STORAGE_KEY) || {};
    return store;
  },
  addUser: async (user: NewUser) => {
    const store = LS.loadState<UsersCollectionState>(STORAGE_KEY) || {};
    const id = uuid();
    const newUser: User = { id, name: user.name, rooms: [] };

    const newStore = { ...store, [id]: newUser };
    LS.saveState(STORAGE_KEY, newStore);

    return newUser;
  },
  editUser: async (editedUser: User) => {
    const store = LS.loadState<UsersCollectionState>(STORAGE_KEY) || {};
    const newStore = { ...store, [editedUser.id]: editedUser };
    LS.saveState(STORAGE_KEY, newStore);

    return editedUser;
  },
  deleteUser: async (userId: UserId) => {
    const store = LS.loadState<UsersCollectionState>(STORAGE_KEY) || {};
    delete store[userId];
    LS.saveState(STORAGE_KEY, store);

    return store;
  },
  deleteRoom: async (roomId: RoomId) => {
    const store = LS.loadState<UsersCollectionState>(STORAGE_KEY) || {};
    const newStore = Object.keys(store).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          ...store[curr],
          rooms: store[curr].rooms.filter(id => id !== roomId),
        },
      }),
      {} as UsersCollectionState
    );
    LS.saveState(STORAGE_KEY, newStore);
  },
};

export default api;
