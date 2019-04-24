import { USER_REDUCER_KEY } from './userReducer';
import { ROOM_REDUCER_KEY } from '../rooms/roomReducer';
import { getUsers, getUserById } from './userSelectors';
import { mockedRooms } from '../rooms/roomDemoData';
import { mockedUsers } from './userDemoData';

describe('userSelectors', () => {
  const store = {
    [ROOM_REDUCER_KEY]: mockedRooms,
    [USER_REDUCER_KEY]: mockedUsers,
  };

  it('`getUsers` selects user data with their access', () => {
    expect(getUsers(store)).toEqual([
      {
        id: 'user1',
        name: 'User 1',
        rooms: ['room1', 'room2'],
      },
      {
        id: 'user2',
        name: 'User 2',
        rooms: ['room1', 'room2'],
      },
    ]);
  });

  it('getUserById', () => {
    expect(getUserById(store, 'user1')).toEqual({
      id: 'user1',
      name: 'User 1',
      rooms: ['room1', 'room2'],
    });
  });
});
