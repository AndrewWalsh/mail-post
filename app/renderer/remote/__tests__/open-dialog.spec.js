import td from 'testdouble';

require('testdouble-jest')(td, jest);

const filePath = ['mocked file path'];
let electron;
let callback;
let openDialog;
describe('openDialog', () => {
  beforeEach(() => {
    electron = td.replace('electron', {
      remote: {
        dialog: {
          showOpenDialog: td.function(),
        },
      },
    });
    callback = td.function();
    openDialog = require('../open-dialog');
  });

  afterEach(() => {
    td.reset();
  });

  it('calls callback with the file path', async () => {
    td.when(electron.remote.dialog.showOpenDialog(td.matchers.isA(Object))).thenCallback(filePath);
    openDialog({}, callback);
    td.verify(callback(filePath[0]));
  });

  it('does not call callback if filePath is not an array', async () => {
    td.when(electron.remote.dialog.showOpenDialog(td.matchers.isA(Object))).thenCallback('not array');
    openDialog({}, callback);
    td.verify(callback(td.matchers.anything()), { times: 0 });
  });
});
