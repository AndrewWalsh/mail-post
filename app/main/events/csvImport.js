import { ipcMain } from 'electron';
import {
  CSV_IMPORT,
} from '../../ipcChannels';

import models from '../models';

export default () => {
  ipcMain.on(CSV_IMPORT, (event, arg) => {
    console.log(models)  // prints "ping"
    // event.sender.send('asynchronous-reply', 'pong')
  })
};
