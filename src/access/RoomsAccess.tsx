import * as React from 'react';
import { Typography, List } from '@material-ui/core';
import { getRooms, getUserById } from '../management';
import { getLoginAs, getAccessModalStatus } from './accessSelectors';
import { connect } from 'react-redux';
import RoomsAccessItem from './RoomsAccessItem';
import UnlockAnimation from './UnlockAnimation';

type MergedProps = ReturnType<typeof mapState>;

const mapState = state => {
  // assert not null: only logged in user can access this page
  const userId = getLoginAs(state)!;

  return {
    rooms: getRooms(state),
    user: getUserById(state, userId),
    accessModalStatus: getAccessModalStatus(state),
  };
};

const RoomsAccess: React.FC<MergedProps> = ({ rooms, user, accessModalStatus }) => {
  return (
    <div>
      <Typography variant="headline">Access Center</Typography>
      <List>
        {rooms.map(room => (
          <RoomsAccessItem user={user} room={room} key={room.id} />
        ))}
      </List>

      {accessModalStatus !== 'INITIAL' && <UnlockAnimation status={accessModalStatus} />}
    </div>
  );
};

export default connect(
  mapState,
  null
)(RoomsAccess);
