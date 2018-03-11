import { ipcMain } from 'electron';
import {
  CSV_IMPORT,
} from '../../ipcChannels';

import db from '../models';

export default () => {
  ipcMain.on(CSV_IMPORT, (event, arg) => {
    db.User.create({
      first_name: '',
      last_name: '',
      username: 'root',
      password: '',
      picture: '',
      email: '',
      createdAt : new Date(),
      updatedAt : new Date(),
    });
    // event.sender.send('asynchronous-reply', 'pong')
  })
};
