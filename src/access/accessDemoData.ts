import { AccessState } from './accessReducer';

export const mockedAccess: AccessState = {
  accessModal: {
    roomId: null,
    status: 'INITIAL',
  },
  loginAs: null,
  logs: {
    log1: {
      id: 'log1',
      isGranted: true,
      userId: 'user1',
      roomId: 'room1',
      date: new Date(),
    },
    log2: {
      id: 'log2',
      isGranted: false,
      userId: 'user1',
      roomId: 'room1',
      date: new Date(),
    },
  },
};
