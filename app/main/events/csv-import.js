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
      const csvFile = filePaths[0]; // eslint-disable-line
      importCsv(csvFile);
    });
  });
};
