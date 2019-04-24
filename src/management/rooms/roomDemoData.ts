import { RoomCollectionState } from './roomReducer';
import { RemoteData } from '../managementCrudHelpers';

export const mockedRooms: RemoteData<RoomCollectionState> = {
  data: {
    room1: {
      id: 'room1',
      name: 'Room 1',
    },
    room2: {
      id: 'room2',
      name: 'Room 2',
    },
  },
  status: 'INITIAL',
};
