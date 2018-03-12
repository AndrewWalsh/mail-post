// @flow
import { ipcMain, dialog } from 'electron';
import { CSV_IMPORT } from '../../ipcChannels';
import { importCsv } from '../controllers';

const options = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

// Opens a dialog that allows importing a single CSV
export default () => {
  ipcMain.on(CSV_IMPORT, () => {
    dialog.showOpenDialog(options, (filePaths) => {
      if (Array.isArray(filePaths) && typeof filePaths[0] === 'string') {
        importCsv(filePaths[0]);
      }
    });
  });
};
