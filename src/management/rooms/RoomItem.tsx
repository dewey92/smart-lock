import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, CardContent, CardActions, TextField, Typography, Button } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { editRoom, deleteRoom } from './roomReducer';
import { Room } from './roomModels';

const mapDispatch = {
  editRoom: editRoom.started,
  deleteRoom: deleteRoom.started,
};

interface RoomItemProps {
  room: Room;
}

const RoomItem: React.FC<RoomItemProps & typeof mapDispatch & WithStyles<typeof styles>> = ({
  classes,
  room,
  ...props
}) => {
  const [isEditingMode, setEditingMode] = React.useState(false);
  const [editValue, setEditValue] = React.useState(room.name);

  return (
    <Card className={classes.root}>
      <CardContent>
        {isEditingMode ? (
          <TextField
            label="Room name"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            margin="dense"
            autoFocus={isEditingMode}
          />
        ) : (
          <Typography variant="title">{room.name}</Typography>
        )}
      </CardContent>
      {isEditingMode ? (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setEditValue(room.name); // reset edit value to the original one
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
              props.editRoom({ id: room.id, name: editValue });
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
          <Button size="small" color="primary" onClick={() => props.deleteRoom(room.id)}>
            Delete
          </Button>
        </CardActions>
      )}
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
)(RoomItem);
