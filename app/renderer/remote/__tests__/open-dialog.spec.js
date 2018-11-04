import td from 'testdouble';
import openDialog from '../open-dialog';

require('testdouble-jest')(td, jest);

describe('openDialog', () => {
  const filePath = ['mocked file path'];
  let electron;
  let callback;

  beforeEach(() => {
    electron = td.replace('electron', {
      remote: {
        dialog: {
          showOpenDialog: td.function(),
        },
      },
    });
    callback = td.function();
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
