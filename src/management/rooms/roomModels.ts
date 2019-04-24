export type RoomId = string;

export interface NewRoom {
  name: string;
}

export interface Room extends NewRoom {
  id: RoomId;
}
