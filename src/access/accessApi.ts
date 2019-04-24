import uuid from 'uuid/v1';
import * as LS from '../shared/localStorage';
import { RoomId, User } from '../management';
import { NewAccessLog } from './logModels';
import { AccessState } from './accessReducer';

const LOG_STORAGE_KEY = 'smartlock__access-logs';

const logOnAccess = (newLog: NewAccessLog) => {
  const store = LS.loadState<AccessState['logs']>(LOG_STORAGE_KEY) || {};
  const id = uuid();
  const newLogEntity = {
    ...newLog,
    id,
    date: new Date(),
  };

  const newStore: typeof store = {
    ...store,
    [id]: newLogEntity,
  };
  LS.saveState(LOG_STORAGE_KEY, newStore);
};

/**
 * Abstract over API effects so we could replace it with real data fetching
 * (`fetch`, `axios`, etc) later without changing the Saga implementation.
 */
const api = {
  openRoom: async (roomId: RoomId, user: User) => {
    const isGranted = user.rooms.includes(roomId);

    // For the sake of the assignment, persist log data. Normally it should be
    // just done in the backend.
    logOnAccess({
      roomId,
      userId: user.id,
      isGranted,
    });

    return isGranted;
  },
  loadAccessLogs: async () => {
    const store = LS.loadState<AccessState['logs']>(LOG_STORAGE_KEY) || {};
    return store;
  },
};

export default api;
