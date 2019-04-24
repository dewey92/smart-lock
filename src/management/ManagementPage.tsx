import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

interface ManagementPageProps {
  header: React.ReactNode;
  form: React.ReactNode;
}

/**
 * Used in  `Rooms` and `Users` page as they share the same oouline look.
 * Would be much easier to tweak the look to make it consistent.
 */
const ManagementPage: React.FC<ManagementPageProps & WithStyles<typeof styles>> = ({
  header,
  form,
  classes,
  children,
}) => (
  <div>
    <header className={classes.header}>
      {header}
      <form noValidate autoComplete="off" className={classes.form}>
        {form}
      </form>
    </header>

    <main className={classes.mainContent}>{children}</main>
  </div>
);

const styles = (theme: Theme) =>
  createStyles({
    header: {
      background: theme.palette.primary.light,
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px 0`,
      color: 'white',
    },
    form: {
      position: 'relative',
      padding: theme.spacing.unit * 2.5,
      transform: 'translateY(50%)',
      background: 'white',
      borderRadius: theme.shape.borderRadius,
    },
    mainContent: {
      padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 4}px 0`,
      background: theme.palette.background.default,
    },
  });

export default withStyles(styles)(ManagementPage);
