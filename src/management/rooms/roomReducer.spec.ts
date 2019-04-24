import { roomReducer, addRoom, editRoom, deleteRoom, loadRooms } from './roomReducer';
import { mockedRooms } from './roomDemoData';
import { Room } from './roomModels';

describe('roomReducer', () => {
  const store = roomReducer(mockedRooms, { type: '' });

  it('loads a list of rooms', () => {
    const afterStore = roomReducer(
      { data: {}, status: 'INITIAL' },
      loadRooms.done({ result: mockedRooms.data })
    );
    const expectedStore: typeof store = { ...mockedRooms, status: 'SUCCESS' };

    expect(afterStore).toEqual(expectedStore);
  });

  it('adds a room', () => {
    const newRoom: Room = { id: 'room3', name: 'Room 3' };
    const afterStore = roomReducer(store, addRoom.done({ params: newRoom, result: newRoom }));
    const expectedStore: typeof store = {
      data: {
        ...store.data,
        [newRoom.id]: newRoom,
      },
      status: 'SUCCESS',
    };

    expect(afterStore).toEqual(expectedStore);
  });

  it('edits a room', () => {
    const editedRoom: Room = { id: 'room2', name: 'Room 2 edited' };
    const afterStore = roomReducer(
      store,
      editRoom.done({ params: editedRoom, result: editedRoom })
    );
    const expectedStore: typeof store = {
      data: {
        ...store.data,
        [editedRoom.id]: editedRoom,
      },
      status: 'SUCCESS',
    };

    expect(afterStore).toEqual(expectedStore);
  });

  it('deletes a room', () => {
    const idToDelete = 'room2';
    const afterStore = roomReducer(store, deleteRoom.done({ params: idToDelete }));
    const expectedRemainingIds = ['room1'];

    expect(Object.keys(afterStore.data)).toEqual(expectedRemainingIds);
  });
});
