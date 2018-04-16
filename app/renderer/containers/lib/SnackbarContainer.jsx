// @flow
import React from 'react';
import { connect } from 'react-redux';

import Snackbar from '../../components/lib/Snackbar';

type Props = {
  id: string,
  message: string,
};

const SnackbarContainer = ({ message, id, ...rest }: Props) =>
  <Snackbar message={message} id={id} {...rest} />;

const mapStateToProps = ({ notification: { message, id } }) => ({ message, id });

export default connect(mapStateToProps)(SnackbarContainer);
