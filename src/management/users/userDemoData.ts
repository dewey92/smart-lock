import { UsersCollectionState } from './userReducer';
import { mockedRooms } from '../rooms/roomDemoData';
import { RemoteData } from '../managementCrudHelpers';

export const mockedUsers: RemoteData<UsersCollectionState> = {
  data: {
    user1: {
      id: 'user1',
      name: 'User 1',
      rooms: Object.keys(mockedRooms.data),
    },
    user2: {
      id: 'user2',
      name: 'User 2',
      rooms: Object.keys(mockedRooms.data),
    },
  },
  status: 'INITIAL',
};
