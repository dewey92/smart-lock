import { createSelector } from 'reselect';
import { RemoteData } from '../managementCrudHelpers';
import { UserId } from './userModels';
import { USER_REDUCER_KEY, UsersCollectionState } from './userReducer';

export const getUserStore = state => state[USER_REDUCER_KEY] as RemoteData<UsersCollectionState>;

export const getUserData = createSelector(
  getUserStore,
  store => store.data
);

export const getUserRemoteStatus = createSelector(
  getUserStore,
  store => store.status
);

export const getUsers = createSelector(
  getUserData,
  data => Object.values(data)
);

export const getUserById = createSelector(
  getUserData,
  (_, userId: UserId) => userId,
  (dataMap, userId) => dataMap[userId]
);
