import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { openDialog } from '../../../remote';
import { CSV_IMPORT } from '../../../../lib/websocket';

const dialogOptions = {
  title: 'Import CSV',
  filters: [
    { name: 'CSV', extensions: ['csv'] },
  ],
  properties: ['openFile'],
};

const NewList = () => (
  <div>
    <Button
      onClick={() => openDialog(CSV_IMPORT, dialogOptions)}
      color="primary"
      variant="raised"
      data-test="import-csv"
    >
      <AddIcon />
      New List
    </Button>
  </div>
);

export default NewList;
