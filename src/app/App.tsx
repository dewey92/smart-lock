import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { initApp } from './appReducer';
import {
  createStyles,
  withStyles,
  WithStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { compose } from 'redux';
import { RoomsList, UsersList } from '../management';
import { LoginAsDialog, RoomsAccess, Logs, getLoginAs, logout } from '../access';

const mapState = state => ({
  loginAs: getLoginAs(state),
});
const mapDispatch = { initApp, logout };

type AppProps = ReturnType<typeof mapState> &
  typeof mapDispatch &
  RouteComponentProps &
  WithStyles<typeof styles>;

const App: React.FC<AppProps> = ({ location, loginAs, classes, ...props }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = React.useState(false);

  // Initialize the app
  React.useEffect(() => {
    props.initApp();
  }, []);

  // We don't want to keep the Drawer and Dialog open when user navigates to another page
  React.useEffect(() => {
    setMenuOpen(false);
    setLoginDialogOpen(false);
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.title}>
            Smart Lock
          </Typography>

          {loginAs === null ? (
            <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
              Login as
            </Button>
          ) : (
            <Button color="inherit" onClick={() => props.logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={isMenuOpen} onClose={() => setMenuOpen(false)}>
        <div className={classes.list}>
          <List subheader={<ListSubheader>Access Management</ListSubheader>}>
            <ListItem button component={props => <Link {...props} to="/rooms" />}>
              <ListItemText primary="Rooms" />
            </ListItem>
            <ListItem
              button
              disabled={loginAs !== null}
              component={props => <Link {...props} to="/users" />}
            >
              <ListItemText primary="Users" />
            </ListItem>
          </List>

          <List subheader={<ListSubheader>Login Area</ListSubheader>}>
            <ListItem
              button
              disabled={loginAs === null}
              component={props => <Link {...props} to="/access" />}
            >
              <ListItemText primary="Access Center" />
            </ListItem>
            <ListItem button component={props => <Link {...props} to="/logs" />}>
              <ListItemText primary="Logs" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <LoginAsDialog isOpen={isLoginDialogOpen} onClose={() => setLoginDialogOpen(false)} />

      <div className="main-content">
        <Route path="/rooms" component={RoomsList} />
        {loginAs === null && <Route path="/users" component={UsersList} />}
        {loginAs !== null && <Route path="/access" component={RoomsAccess} />}
        <Route path="/logs" component={Logs} />
        <Route exact path="/" render={() => <Redirect to="/rooms" />} />
      </div>
    </div>
  );
};

const styles = createStyles({
  '@global': {
    body: {
      margin: 0,
    },
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    minWidth: 250,
  },
});

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch
  ),
  withStyles(styles)
)(App);
