import * as React from 'react';
import { createStyles, withStyles, WithStyles, CircularProgress } from '@material-ui/core';

const Loading: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress size={75} />
    </div>
  );
};

const styles = createStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, .8)',
  },
});

export default withStyles(styles)(Loading);
