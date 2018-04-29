import { openDialog } from '../../../remote';

const dialogOptions = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

const openDialogCsvImport = (callback) => {
  openDialog(dialogOptions, callback);
};

export default openDialogCsvImport;
