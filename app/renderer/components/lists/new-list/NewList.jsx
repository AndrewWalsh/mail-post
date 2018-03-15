// @flow
import React from 'react';
import { csvImport } from '../../../utils';

const NewList = () => (
  <div>
    <button onClick={() => csvImport()} data-test="import-csv">
      Import CSV
    </button>
  </div>
);

export default NewList;
