import actionCreatorFactory from 'typescript-fsa';
import { deleteRoom } from '../rooms';
import { UserId, User, NewUser } from './userModels';
import { createManagementCRUD } from '../managementCrudHelpers';

export type UsersCollectionState = Record<UserId, User>;

const actionCreator = actionCreatorFactory('user');
export const loadUsers = actionCreator.async<void, UsersCollectionState>('LOAD_USERS');
export const addUser = actionCreator.async<NewUser, User>('ADD_USER');
export const editUser = actionCreator.async<User, User>('EDIT_USER');
export const deleteUser = actionCreator.async<UserId, void>('DELETE_USER');

export const USER_REDUCER_KEY = 'user';

const initialState: UsersCollectionState = {};

export const userReducer = createManagementCRUD({
  initialState,
  loadAction: loadUsers,
  addAction: addUser,
  editAction: editUser,
  deleteAction: deleteUser,
  additionalReducer: (state, action) => {
    // Remove related `roomId` reference at `user.rooms`
    if (deleteRoom.done.match(action)) {
      const data = state.data;
      return {
        ...state,
        data: Object.keys(data).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: {
              ...data[curr],
              rooms: data[curr].rooms.filter(roomId => roomId !== action.payload.params),
            },
          }),
          {} as UsersCollectionState
        ),
      };
    }

    return state;
  },
});
