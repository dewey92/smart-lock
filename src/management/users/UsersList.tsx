import * as React from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { getUsers, getUserRemoteStatus } from './userSelectors';
import { addUser } from './userReducer';
import UserItem from './UserItem';
import Loading from '../../shared/Loading';
import ManagementPage from '../ManagementPage';
import { getRooms } from '../rooms';

const mapState = state => ({
  users: getUsers(state),
  rooms: getRooms(state),
  remoteStatus: getUserRemoteStatus(state),
});
const mapDispatch = { addUser: addUser.started };

type UsersListProps = ReturnType<typeof mapState> & typeof mapDispatch;

const UsersList: React.FC<UsersListProps> = ({ users, rooms, remoteStatus, ...props }) => {
  const [newUserName, setNewUserName] = React.useState('');
  const onSubmitNeWRoom = () => {
    props.addUser({ name: newUserName });
    setNewUserName('');
  };

  return (
    <ManagementPage
      header={
        <>
          <Typography variant="h3" color="inherit">
            Users List
          </Typography>
          <Typography variant="h6" color="inherit">
            {users.length} user(s)
          </Typography>
        </>
      }
      form={
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <TextField
              label="User name"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
              margin="dense"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" color="secondary" onClick={onSubmitNeWRoom}>
              Add User
              <Add />
            </Button>
          </Grid>
        </Grid>
      }
    >
      {users.map(user => (
        <UserItem user={user} rooms={rooms} key={user.id} />
      ))}
      {remoteStatus === 'LOADING' && <Loading />}
    </ManagementPage>
  );
};

export default connect(
  mapState,
  mapDispatch
)(UsersList);
