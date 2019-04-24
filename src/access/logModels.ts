import { UserId, RoomId } from '../management';

export type AccessLogId = string;

export interface NewAccessLog {
  userId: UserId;
  roomId: RoomId;
  isGranted: boolean;
}

export interface AccessLog extends NewAccessLog {
  id: AccessLogId;
  date: Date;
}
