// @flow
import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { csvImport } from '../../../ipc/send';

const NewList = () => (
  <div>
    <Button
      onClick={() => csvImport()}
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
