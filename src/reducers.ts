import { combineReducers } from 'redux';
import { ROOM_REDUCER_KEY, USER_REDUCER_KEY, roomReducer, userReducer } from './management';
import { ACCESS_REDUCER_KEY, accessReducer } from './access';

export default combineReducers({
  [ROOM_REDUCER_KEY]: roomReducer,
  [USER_REDUCER_KEY]: userReducer,
  [ACCESS_REDUCER_KEY]: accessReducer,
});
