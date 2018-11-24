import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const PaperField = ({
  classes,
  children,
  ...rest
}) => (
  <Paper className={classes.root}>
    <Field {...rest}>
      {children}
    </Field>
  </Paper>
);

PaperField.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

PaperField.defaultProps = {
  children: null,
};

export default withStyles(styles)(PaperField);
