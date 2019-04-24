import * as React from 'react';
import { createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import LockedIcon from '@material-ui/icons/Lock';
import UnlockedIcon from '@material-ui/icons/LockOpen';
import cx from 'classnames';

type LockStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
interface UnlockAnimationProps {
  status: LockStatus;
}

const ANIMATION_DURATION = 1000;

/**
 * This component is for animation purpose only.
 */
const UnlockAnimation: React.FC<UnlockAnimationProps & WithStyles<typeof styles>> = ({
  status,
  classes,
}) => {
  const statusText: Record<LockStatus, React.ReactNode> = {
    LOADING: 'Unlocking ..',
    SUCCESS: 'Door unlocked',
    ERROR: `You're not authorized`,
  };

  return (
    <div
      className={cx(classes.root, {
        [classes.loadingLock]: status === 'LOADING',
        [classes.successLock]: status === 'SUCCESS',
        [classes.errorLock]: status === 'ERROR',
      })}
    >
      <div className={classes.center}>
        {status === 'SUCCESS' ? (
          <UnlockedIcon className={classes.icon} />
        ) : (
          <LockedIcon className={classes.icon} />
        )}
        <Typography variant="h4">{statusText[status]}</Typography>
      </div>
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
  },
  center: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 120,
  },
  loadingLock: {
    background: 'rgba(255, 255, 255, .8)',
  },
  successLock: {
    background: 'rgba(237, 253, 240, .8)',
  },
  errorLock: {
    background: 'rgba(252, 235, 231, .8)',
    animation: 'shake 0.82s cubic-bezier(.36, .07, .19, .97) both',
    transform: 'translate3d(0, 0, 0)',
  },
  '@global': {
    '@keyframes shake': {
      '10%, 90%': {
        transform: 'translate3d(-1px, 0, 0)',
      },
      '20%, 80%': {
        transform: 'translate3d(2px, 0, 0)',
      },
      '30%, 50%, 70%': {
        transform: 'translate3d(-4px, 0, 0)',
      },
      '40%, 60%': {
        transform: 'translate3d(4px, 0, 0)',
      },
    },
  },
});

export default withStyles(styles)(UnlockAnimation);
