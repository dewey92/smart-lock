import actionCreatorFactory from 'typescript-fsa';
import { RoomId, Room, NewRoom } from './roomModels';
import { createManagementCRUD } from '../managementCrudHelpers';

export type RoomCollectionState = Record<RoomId, Room>;

const actionCreator = actionCreatorFactory('room');
export const loadRooms = actionCreator.async<void, RoomCollectionState>('LOAD_ROOMS');
export const addRoom = actionCreator.async<NewRoom, Room>('ADD_ROOM');
export const editRoom = actionCreator.async<Room, Room>('EDIT_ROOM');
export const deleteRoom = actionCreator.async<RoomId, void>('DELETE_ROOM');

export const ROOM_REDUCER_KEY = 'room';
const initialState: RoomCollectionState = {};

export const roomReducer = createManagementCRUD({
  initialState,
  loadAction: loadRooms,
  addAction: addRoom,
  editAction: editRoom,
  deleteAction: deleteRoom,
});
