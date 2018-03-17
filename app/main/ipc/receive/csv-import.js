// @flow
import { ipcMain, dialog } from 'electron';

import { CSV_IMPORT, ON_CSV_INVALID } from '../../../ipcChannels';
import { importCsv } from '../../controllers';
import { csvIsValid } from './helpers';
import send from '../send';

const options = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

// Opens a dialog that allows importing a single CSV
export default () => {
  ipcMain.on(CSV_IMPORT, (event) => {
    dialog.showOpenDialog(options, async (filePaths) => {
      if (!Array.isArray(filePaths)) return;
      const csvPath = filePaths[0];
      try {
        await csvIsValid(csvPath);
      } catch (e) {
        send(event.sender.send.bind(event.sender), ON_CSV_INVALID, e);
        return;
      }
      importCsv(filePaths[0]);
    });
  });
};
