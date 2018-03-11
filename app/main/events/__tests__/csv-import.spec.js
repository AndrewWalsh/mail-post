import td from 'testdouble';

import { CSV_IMPORT } from '../../../ipcChannels';

require('testdouble-jest')(td, jest);

let csvImport;
let ipcMain;
let dialog;
let importCsv;
describe('csvImport', () => {
  beforeEach(() => {
    const electron = td.replace('electron', {
      ipcMain: { on: td.function() },
      dialog: { showOpenDialog: td.function() },
    });
    ({ ipcMain, dialog } = electron);
    importCsv = td.replace('../../controllers/import/import-csv');
    csvImport = require('../csv-import');
  });

  afterEach(() => {
    td.reset();
  });

  it('calls dialog.showOpenDialog when CSV_IMPORT message is received', async () => {
    const mockOpts = {
      title: 'Import CSV',
      filters: [
        { name: 'CSV', extensions: ['csv'] },
      ],
      properties: ['openFile'],
    };
    const mockPath = ['/abc'];

    td.when(ipcMain.on(CSV_IMPORT))
      .thenCallback();

    td.when(dialog.showOpenDialog(mockOpts))
      .thenCallback(mockPath);

    csvImport();

    td.verify(ipcMain.on(CSV_IMPORT, td.matchers.isA(Function)));
    td.verify(dialog.showOpenDialog(mockOpts, td.matchers.isA(Function)));
    td.verify(importCsv(mockPath[0]));
  });
});
