import openDialogCsvImport from '../open-dialog-csv-import';
import openDialog from '../../../../remote/open-dialog';

jest.mock('../../../../remote/open-dialog');

describe('open-dialog-csv-import', () => {
  const dialogOptions = {
    title: 'Import CSV',
    filters: [
      { name: 'CSV', extensions: ['csv'] },
    ],
    properties: ['openFile'],
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls openDialog with dialogOptions and the provided callback', () => {
    const callback = jest.fn();
    openDialogCsvImport(callback);
    expect(openDialog).toHaveBeenCalledWith(dialogOptions, callback);
  });
});
