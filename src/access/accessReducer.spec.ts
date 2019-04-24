import {
  accessReducer,
  loginAs,
  logout,
  openRoom,
  resetStatus,
  loadLogs,
  AccessState,
} from './accessReducer';
import { mockedAccess } from './accessDemoData';

describe('access reducer', () => {
  const store = accessReducer(undefined, { type: '' });

  describe('login & logout activity', () => {
    it('logins', () => {
      const afterStore = accessReducer(store, loginAs('user1'));
      expect(afterStore.loginAs).toBe('user1');
    });

    it('logouts', () => {
      const loggedInStore = { ...store, loginAs: 'user1' };
      const afterStore = accessReducer(loggedInStore, logout());
      expect(afterStore.loginAs).toBeNull();
    });
  });

  describe('unlocking rooms', () => {
    it('unlocks a room', () => {
      const payload = { userId: 'user1', roomId: 'room1' };

      // Request
      const storeDuringRequest = accessReducer(store, openRoom.started(payload));
      expect(storeDuringRequest.accessModal).toEqual({ roomId: 'room1', status: 'LOADING' });

      // On success
      const storeWhenSuccess = accessReducer(
        storeDuringRequest,
        openRoom.done({ params: payload, result: true })
      );
      expect(storeWhenSuccess.accessModal).toEqual({ roomId: 'room1', status: 'SUCCESS' });

      // on failed
      const storeWhenFailed = accessReducer(
        storeDuringRequest,
        openRoom.failed({ params: payload, error: {} })
      );
      expect(storeWhenFailed.accessModal).toEqual({ roomId: 'room1', status: 'ERROR' });

      // on reset
      const storeWhenResetted = accessReducer(storeWhenSuccess, resetStatus());
      expect(storeWhenResetted.accessModal).toEqual({ roomId: null, status: 'INITIAL' });
    });
  });

  describe('logs', () => {
    it('loads a list of logs', () => {
      const mockedLog = mockedAccess.logs;
      const afterStore = accessReducer(store, loadLogs.done({ result: mockedLog }));
      expect(afterStore.logs).toEqual(mockedLog);
    });
  });
});
