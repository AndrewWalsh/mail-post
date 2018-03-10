// @flow
import React from 'react';
import { csvImport } from '../../../utils';

const NewCampaign = () => (
  <div>
    <button onClick={() => csvImport()}>
      Import CSV
    </button>
  </div>
);

export default NewCampaign;
