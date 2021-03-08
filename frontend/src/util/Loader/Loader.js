import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles} from "./style";

function LoadingComponent(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

LoadingComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingComponent);
