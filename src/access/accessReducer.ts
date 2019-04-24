import actionCreatorFactory from 'typescript-fsa';
import { Action } from 'redux';
import { RoomId, UserId } from '../management';
import { AccessLogId, AccessLog } from './logModels';

export interface AccessState {
  loginAs: UserId | null;
  accessModal: {
    roomId: RoomId | null;
    status: 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR';
  };
  logs: Record<AccessLogId, AccessLog>;
}

const actionCreator = actionCreatorFactory('login');

// Login
export const loginAs = actionCreator<UserId>('LOGIN_AS');
export const logout = actionCreator('LOGOUT');
// Modal
export const openRoom = actionCreator.async<{ userId: UserId; roomId: RoomId }, boolean>('OPEN_ROOM'); // prettier-ignore
export const resetStatus = actionCreator('RESET_MODAL_STATUS');
// Logs
export const loadLogs = actionCreator.async<void, AccessState['logs']>('LOAD_LOGS');

export const ACCESS_REDUCER_KEY = 'access';

const initialState: AccessState = {
  loginAs: null,
  accessModal: {
    roomId: null,
    status: 'INITIAL',
  },
  logs: {},
};

export const accessReducer = (state = initialState, action: Action): AccessState => {
  if (loginAs.match(action)) {
    return { ...state, loginAs: action.payload };
  }

  if (logout.match(action)) {
    return { ...state, loginAs: null };
  }

  if (openRoom.started.match(action)) {
    // Only show one modal at a time
    if (state.accessModal.status !== 'INITIAL') return state;
    return {
      ...state,
      accessModal: {
        roomId: action.payload.roomId,
        status: 'LOADING',
      },
    };
  }

  if (openRoom.done.match(action)) {
    return {
      ...state,
      accessModal: {
        ...state.accessModal,
        status: 'SUCCESS',
      },
    };
  }

  if (openRoom.failed.match(action)) {
    return {
      ...state,
      accessModal: {
        ...state.accessModal,
        status: 'ERROR',
      },
    };
  }

  if (resetStatus.match(action)) {
    return {
      ...state,
      accessModal: {
        roomId: null,
        status: 'INITIAL',
      },
    };
  }

  if (loadLogs.done.match(action)) {
    return {
      ...state,
      logs: action.payload.result,
    };
  }

  return state;
};
