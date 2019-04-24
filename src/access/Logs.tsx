import * as React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import CheckedIcon from '@material-ui/icons/Check';
import CanceledIcon from '@material-ui/icons/Cancel';
import { getAccessLogs } from './accessSelectors';

const mapState = state => ({
  logs: getAccessLogs(state),
});

const Logs: React.FC<ReturnType<typeof mapState>> = ({ logs }) => (
  <List>
    {logs.map(log => (
      <ListItem key={log.id}>
        <ListItemIcon>{log.isGranted ? <CheckedIcon /> : <CanceledIcon />}</ListItemIcon>
        <ListItemText
          primary={
            <>
              <strong>{log.room}</strong> - {log.isGranted ? 'granted' : 'rejected'}
            </>
          }
          secondary={
            <>
              accessed by <strong>{log.user}</strong> on <strong>{log.date}</strong>
            </>
          }
        />
      </ListItem>
    ))}
  </List>
);

export default connect(mapState)(Logs);
