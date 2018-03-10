import td from 'testdouble';

require('testdouble-jest')(td, jest);

let electron;
let ipcSend;
describe('ipcSend', () => {
  beforeEach(() => {
    const electronReplace = td.replace('electron', {
      ipcRenderer: {
        send: td.function(),
      },
    });
    ipcSend = require('../ipcSend');
    electron = electronReplace;
  });

  it('calls ipcRenderer.send, passing the channel & n arguments', async () => {
    const firstArg = 'hello';
    const nArgs = [];
    for (let i = 0; i < 10; i += 1) {
      nArgs.push(i);
    }
    ipcSend(firstArg, ...nArgs);
    td.verify(electron.ipcRenderer.send(firstArg, ...nArgs));
  });
});
