import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from './Snackbar';

const SnackbarContainer = ({ message, id, ...rest }) => (
  <Snackbar message={message} id={id} {...rest} />
);

SnackbarContainer.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = ({ notification: { message, id } }) => ({ message, id });

export default connect(mapStateToProps)(SnackbarContainer);
