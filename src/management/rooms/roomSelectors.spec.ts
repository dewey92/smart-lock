import { roomReducer, ROOM_REDUCER_KEY } from './roomReducer';
import { mockedRooms } from './roomDemoData';
import { getRooms, getRoomData, getRoomRemoteStatus } from './roomSelectors';

describe('roomSelectors', () => {
  const store = {
    [ROOM_REDUCER_KEY]: roomReducer(mockedRooms, { type: '' }),
  };

  it('getRoomsData', () => {
    expect(getRoomData(store)).toEqual(mockedRooms.data);
  });

  it('getRoomRemoteStatus', () => {
    expect(getRoomRemoteStatus(store)).toEqual('INITIAL');
  });

  it('getRooms', () => {
    const result = [{ id: 'room1', name: 'Room 1' }, { id: 'room2', name: 'Room 2' }];
    expect(getRooms(store)).toEqual(result);
  });
});
