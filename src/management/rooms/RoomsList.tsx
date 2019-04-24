import * as React from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Loading from '../../shared/Loading';
import ManagementPage from '../ManagementPage';
import { getRooms, getRoomRemoteStatus } from './roomSelectors';
import { addRoom } from './roomReducer';
import RoomItem from './RoomItem';

type RoomsListProps = ReturnType<typeof mapState> & typeof mapDispatch;

const mapState = state => ({
  rooms: getRooms(state),
  remoteStatus: getRoomRemoteStatus(state),
});
const mapDispatch = { addRoom: addRoom.started };

const RoomsList: React.FC<RoomsListProps> = ({ rooms, remoteStatus, ...props }) => {
  const [newRoomName, setNewRoomName] = React.useState('');
  const onSubmitNewRoom = () => {
    props.addRoom({ name: newRoomName });
    setNewRoomName('');
  };

  return (
    <ManagementPage
      header={
        <>
          <Typography variant="h3" color="inherit">
            Rooms List
          </Typography>
          <Typography variant="h6" color="inherit">
            {rooms.length} room(s)
          </Typography>
        </>
      }
      form={
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <TextField
              label="Room name"
              value={newRoomName}
              onChange={e => setNewRoomName(e.target.value)}
              margin="dense"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" color="secondary" onClick={onSubmitNewRoom}>
              Add Room
              <Add />
            </Button>
          </Grid>
        </Grid>
      }
    >
      {rooms.map(room => (
        <RoomItem room={room} key={room.id} />
      ))}
      {remoteStatus === 'LOADING' && <Loading />}
    </ManagementPage>
  );
};

export default connect(
  mapState,
  mapDispatch
)(RoomsList);
