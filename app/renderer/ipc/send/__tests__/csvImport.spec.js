import td from 'testdouble';

import { CSV_IMPORT } from '../../../../ipcChannels';

require('testdouble-jest')(td, jest);

let csvImport;
let ipcSend;
describe('csvImport', () => {
  beforeEach(() => {
    const ipcSendReplace = td.replace('../ipcSend');
    csvImport = require('../csvImport');
    ipcSend = ipcSendReplace;
  });

  it('calls ipcSend, passing const "CSV_IMPORT" and args provided', async () => {
    const nArgs = [];
    for (let i = 0; i < 10; i += 1) {
      nArgs.push(i);
    }
    csvImport(...nArgs);
    td.verify(ipcSend(CSV_IMPORT, ...nArgs));
  });
});
