import { remote } from 'electron';
import { io } from '../utils';

export default (channel, options) => {
  remote.dialog.showOpenDialog(options, async (filePaths) => {
    if (!Array.isArray(filePaths) || !filePaths[0]) return;
    const csvPath = filePaths[0];
    io.emit(channel, csvPath);
  });
};
