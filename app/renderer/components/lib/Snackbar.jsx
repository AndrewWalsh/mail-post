// @flow
import React, { Component } from 'react';
import MaterialSnackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

type Props = {
  id: string,
  message: string,
};

type State = {
  open: boolean,
};

export default class Snackbar extends Component<Props, State> {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    const { id } = this.props;
    const nextId = nextProps.id;
    if (id !== nextId) this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { message } = this.props;
    const { open } = this.state;
    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        SnackbarContentProps={{
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
