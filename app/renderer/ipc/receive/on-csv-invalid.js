// @flow
import { ipcRenderer } from 'electron';

import { ON_CSV_INVALID } from '../../../ipcChannels';
import { store } from '../../store';
import { notification } from '../../actions';

export default () => {
  ipcRenderer.on(ON_CSV_INVALID, (event, message) => {
    store.dispatch(notification(message));
  });
};
