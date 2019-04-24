import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Divider,
} from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { getRooms, Room, RoomId } from '../rooms';
import { editUser, deleteUser } from './userReducer';
import { User } from './userModels';

interface UserItemProps {
  user: User;
  rooms: Room[];
}

const mapState = state => ({
  rooms: getRooms(state),
});
const mapDispatch = {
  editUser: editUser.started,
  deleteUser: deleteUser.started,
};

const UserItem: React.FC<
  UserItemProps & ReturnType<typeof mapState> & typeof mapDispatch & WithStyles<typeof styles>
> = ({ classes, user, rooms, ...props }) => {
  const [isEditingMode, setEditingMode] = React.useState(false);
  const [editNameValue, setEditNameValue] = React.useState(user.name);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {isEditingMode ? (
              <TextField
                label="User name"
                value={editNameValue}
                onChange={e => setEditNameValue(e.target.value)}
                margin="dense"
                autoFocus={isEditingMode}
              />
            ) : (
              <Typography variant="title">{user.name}</Typography>
            )}
          </Grid>
          <Grid item>
            {isEditingMode ? (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditNameValue(user.name); // reset edit value
                    setEditingMode(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditingMode(false);
                    props.editUser({
                      ...user,
                      name: editNameValue,
                    });
                  }}
                >
                  Save
                </Button>
              </CardActions>
            ) : (
              <CardActions>
                <Button size="small" color="primary" onClick={() => setEditingMode(true)}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={() => props.deleteUser(user.id)}>
                  Delete
                </Button>
              </CardActions>
            )}
          </Grid>
        </Grid>

        <Divider />

        <FormGroup>
          {rooms.map(room => (
            <FormControlLabel
              control={
                <Switch
                  checked={user.rooms.includes(room.id)}
                  onChange={(_, checked) => {
                    const newRooms = checked
                      ? [...user.rooms, room.id]
                      : user.rooms.filter(roomId => roomId !== room.id);

                    props.editUser({
                      ...user,
                      rooms: newRooms,
                    });
                  }}
                />
              }
              label={room.name}
              key={room.id}
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing.unit * 2,
    },
  });

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatch
  )
)(UserItem);
