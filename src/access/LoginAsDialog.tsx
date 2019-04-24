import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import { getUsers } from '../management';
import { loginAs } from './accessReducer';

interface LoginAsDialogProps {
  onClose: () => void;
  isOpen: boolean;
}
type MergedProps = LoginAsDialogProps & ReturnType<typeof mapState> & typeof mapDispatch;

const mapState = state => ({
  users: getUsers(state),
});
const mapDispatch = { loginAs };

const LoginAsDialog: React.FC<MergedProps> = ({ onClose, isOpen, users, ...props }) => (
  <Dialog onClose={onClose} open={isOpen} aria-labelledby="simple-dialog-title">
    <DialogTitle id="simple-dialog-title">Login As</DialogTitle>
    <div>
      <List>
        {users.map(user => (
          <ListItem
            button
            onClick={() => {
              props.loginAs(user.id);
              onClose();
            }}
            key={user.id}
          >
            <ListItemAvatar>
              <Avatar className={''}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
        <ListItem button component={props => <Link {...props} to="/users" />}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add user" />
        </ListItem>
      </List>
    </div>
  </Dialog>
);

export default connect(
  mapState,
  mapDispatch
)(LoginAsDialog);
