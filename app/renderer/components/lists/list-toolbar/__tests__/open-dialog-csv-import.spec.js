import td from 'testdouble';

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
  let openDialogCsvImport;

  beforeEach(() => {
    remote = td.replace('../../../../remote', {
      openDialog: td.function(),
    });

    openDialogCsvImport = require('../open-dialog-csv-import');
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

