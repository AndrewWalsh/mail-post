import { remote } from 'electron';

export default (options, callback) => {
  remote.dialog.showOpenDialog(options, async (filePaths) => {
    if (!Array.isArray(filePaths) || !filePaths[0]) return;
    const filePath = filePaths[0];
    callback(filePath);
  });
};
