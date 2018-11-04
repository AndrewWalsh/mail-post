import td from 'testdouble';
import openDialogCsvImport from '../open-dialog-csv-import';

require('testdouble-jest')(td, jest);

describe('open-dialog-csv-import', () => {
  const dialogOptions = {
    title: 'Import CSV',
    filters: [
      { name: 'CSV', extensions: ['csv'] },
    ],
    properties: ['openFile'],
  };

  let remote;

  beforeEach(() => {
    remote = td.replace('../../../../remote', {
      openDialog: td.function(),
    });
  });

  afterEach(() => {
    td.reset();
  });

  it('calls openDialog with dialogOptions and the provided callback', () => {
    const callback = td.function();
    openDialogCsvImport(callback);
    td.verify(remote.openDialog(dialogOptions, callback));
  });
});
