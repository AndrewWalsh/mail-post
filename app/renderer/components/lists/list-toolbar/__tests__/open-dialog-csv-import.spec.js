import td from 'testdouble';
import { CSV_IMPORT } from '../../../../../lib/websocket';

require('testdouble-jest')(td, jest);

const dialogOptions = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

let remote;
let openDialogCsvImport;
describe('open-dialog-csv-import', () => {
  beforeEach(() => {
    remote = td.replace('../../../../remote', {
      openDialog: td.function(),
    });

    openDialogCsvImport = require('../open-dialog-csv-import');
  });

  afterEach(() => {
    td.reset();
  });

  it('calls openDialog with CSV_IMPORT, dialogOptions and an object', () => {
    const listNameValue = 'listNameValue test';
    openDialogCsvImport(listNameValue);
    td.verify(remote.openDialog(CSV_IMPORT, dialogOptions, { name: listNameValue }));
  });
});

