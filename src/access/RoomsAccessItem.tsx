import * as React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core';
import LockedIcon from '@material-ui/icons/Lock';
import UnlockedIcon from '@material-ui/icons/LockOpen';
import { Room, User } from '../management';
import { openRoom } from './accessReducer';
import { connect } from 'react-redux';
import { mkIsAccessGranted } from './accessSelectors';
import useLockCountdown from './useLockCountdown';

interface RoomsAccessItemProps {
  room: Room;
  user: User;
  countDownInterval?: number;
}
type MergedProps = RoomsAccessItemProps &
  ReturnType<ReturnType<typeof mapState>> &
  ReturnType<typeof mapDispatch>;

const mapState = (_, props: RoomsAccessItemProps) => {
  const getIsAccessGranted = mkIsAccessGranted(props.room.id);
  return state => ({
    isAccessGranted: getIsAccessGranted(state),
  });
};

const mapDispatch = (dispatch, ownProps: RoomsAccessItemProps) => ({
  openRoom: () =>
    dispatch(openRoom.started({ userId: ownProps.user.id, roomId: ownProps.room.id })),
});

const RoomsAccessItem: React.FC<MergedProps> = ({
  room,
  user,
  isAccessGranted,
  countDownInterval = 1000,
  ...props
}) => {
  const [state, dispatch] = useLockCountdown(countDownInterval);

  // unlock room when access has been granted
  React.useEffect(() => {
    if (isAccessGranted) dispatch('UNLOCK_ROOM');
  }, [isAccessGranted]);

  // count down effect (auto-lock) after a door is successfully unlocked
  React.useEffect(() => {
    let intervalId;
    if (!state.isLocked) {
      intervalId = setInterval(() => dispatch('COUNT_DOWN'), countDownInterval);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [state.isLocked]);

  return (
    <ListItem button divider key={room.id}>
      <ListItemIcon>
        {state.isLocked ? <LockedIcon color="error" /> : <UnlockedIcon color="secondary" />}
      </ListItemIcon>
      <ListItemText
        primary={room.name}
        secondary={
          <>
            <Typography component="span" inline>
              Status: <strong>{state.isLocked ? 'locked' : 'unlocked'}</strong>
            </Typography>
            {!state.isLocked && ` - locked in ${state.timeRemaining / 1000}s`}
          </>
        }
      />
      {state.isLocked && (
        <ListItemSecondaryAction>
          <Button onClick={props.openRoom}>Unlock</Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default connect(
  mapState,
  mapDispatch
)(RoomsAccessItem);
