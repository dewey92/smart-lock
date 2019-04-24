import { RoomId } from '../rooms';

export type UserId = string;

export interface NewUser {
  name: string;
}

export interface User extends NewUser {
  id: UserId;
  rooms: RoomId[];
}
