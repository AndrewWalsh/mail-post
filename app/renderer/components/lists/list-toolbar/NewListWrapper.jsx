import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import NewList from './NewList';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3,
  }),
});

const NewListWrapper = ({
  classes,
  ...rest
}) => (
  <Paper className={classes.root}>
    <NewList {...rest} />
  </Paper>
);

NewListWrapper.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(NewListWrapper);
