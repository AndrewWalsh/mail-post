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

const NewCampaignForm = ({
  classes,
  ...rest
}) => (
  <Paper className={classes.root}>
    <Field {...rest} fullWidth />
  </Paper>
);

NewCampaignForm.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(NewCampaignForm);
