import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Snackbar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props;
    const nextId = nextProps.id;
    if (id !== nextId) this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { message } = this.props;
    const { open } = this.state;
    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Snackbar.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
