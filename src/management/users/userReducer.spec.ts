import { userReducer, loadUsers, addUser, editUser, deleteUser } from './userReducer';
import { mockedUsers } from './userDemoData';
import { User } from './userModels';

describe('userReducer', () => {
  const store = userReducer(mockedUsers, { type: '' });

  it('loads a list of users', () => {
    const afterStore = userReducer(
      { data: {}, status: 'INITIAL' },
      loadUsers.done({ result: mockedUsers.data })
    );
    const expectedStore: typeof store = { ...mockedUsers, status: 'SUCCESS' };

    expect(afterStore).toEqual(expectedStore);
  });

  it('adds a user', () => {
    const newUser: User = { id: 'user3', name: 'User 3', rooms: [] };
    const afterStore = userReducer(store, addUser.done({ params: newUser, result: newUser }));
    const expectedStore: typeof store = {
      data: {
        ...store.data,
        [newUser.id]: newUser,
      },
      status: 'SUCCESS',
    };

    expect(afterStore).toEqual(expectedStore);
  });

  it('edits a room', () => {
    const editedUser: User = { id: 'user2', name: 'User 2 edited', rooms: [] };
    const afterStore = userReducer(
      store,
      editUser.done({ params: editedUser, result: editedUser })
    );
    const expectedStore: typeof store = {
      data: {
        ...store.data,
        [editedUser.id]: editedUser,
      },
      status: 'SUCCESS',
    };

    expect(afterStore).toEqual(expectedStore);
  });

  it('deletes a user', () => {
    const idToDelete = 'user2';
    const afterStore = userReducer(store, deleteUser.done({ params: idToDelete }));
    const expectedRemainingIds = ['user1'];

    expect(Object.keys(afterStore.data)).toEqual(expectedRemainingIds);
  });
});
