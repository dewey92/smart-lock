import * as React from 'react';

interface AccessState {
  isLocked: boolean;
  timeRemaining: number;
  interval: number;
}
type AccessAction = 'UNLOCK_ROOM' | 'COUNT_DOWN' | 'LOCK_ROOM';

// Use `reducer` rather than `useState` for more predictability in capturing
// state during re-rendering. Especially when dealing with Timer.
// See: https://overreacted.io/a-complete-guide-to-useeffect/
const reducer = (state: AccessState, action: AccessAction): AccessState => {
  if (action === 'UNLOCK_ROOM') {
    return { ...state, isLocked: false, timeRemaining: 10000 };
  }

  if (action === 'COUNT_DOWN') {
    return state.timeRemaining > 1000
      ? { ...state, timeRemaining: state.timeRemaining - state.interval }
      : reducer(state, 'LOCK_ROOM');
  }

  if (action === 'LOCK_ROOM') {
    return { ...state, isLocked: true, timeRemaining: 0 };
  }

  return state;
};

const useLockCountdown = (interval: number) =>
  React.useReducer(reducer, {
    isLocked: true,
    timeRemaining: 0,
    interval,
  });

export default useLockCountdown;
