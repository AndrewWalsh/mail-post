import { openDialog } from '../../../remote';
import { CSV_IMPORT } from '../../../../lib/websocket';

const dialogOptions = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

const openDialogCsvImport = (listNameValue) => {
  openDialog(CSV_IMPORT, dialogOptions, { name: listNameValue });
};

export default openDialogCsvImport;
