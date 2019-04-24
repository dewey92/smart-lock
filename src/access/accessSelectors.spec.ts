import { ROOM_REDUCER_KEY, USER_REDUCER_KEY } from '../management';
import { mockedRooms } from '../management/rooms/roomDemoData';
import { mockedUsers } from '../management/users/userDemoData';
import { ACCESS_REDUCER_KEY } from './accessReducer';
import { mockedAccess } from './accessDemoData';
import { getAccessLogs, mkIsAccessGranted } from './accessSelectors';

describe('access selectors', () => {
  const mockedDate = new Date('April 21, 2019 06:00:00');
  const mockedDate2 = new Date('April 22, 2019 12:00:00');
  const store = {
    [ROOM_REDUCER_KEY]: mockedRooms,
    [USER_REDUCER_KEY]: mockedUsers,
    [ACCESS_REDUCER_KEY]: {
      ...mockedAccess,
      logs: {
        log1: {
          ...mockedAccess.logs.log1,
          date: mockedDate,
        },
        log2: {
          ...mockedAccess.logs.log2,
          date: mockedDate2,
        },
      },
    },
  };

  it('provides logs with filled-in data', () => {
    const expected = [
      {
        id: 'log2',
        isGranted: false,
        room: 'Room 1',
        user: 'User 1',
        date: 'Mon, 22/04/2019, 12:00:00',
      },
      {
        id: 'log1',
        isGranted: true,
        room: 'Room 1',
        user: 'User 1',
        date: 'Sun, 21/04/2019, 06:00:00',
      },
    ];

    expect(getAccessLogs(store)).toEqual(expected);
  });

  it('defines whether a room has been granted access or not', () => {
    const newStore = {
      ...store,
      [ACCESS_REDUCER_KEY]: {
        ...store[ACCESS_REDUCER_KEY],
        accessModal: { roomId: 'room1', status: 'SUCCESS' },
      },
    };

    expect(mkIsAccessGranted('room1')(newStore)).toBe(true);
    expect(mkIsAccessGranted('room2')(newStore)).toBe(false);
  });
});
