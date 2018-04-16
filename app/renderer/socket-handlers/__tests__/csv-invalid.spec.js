import td from 'testdouble';
import { notification } from '../../actions';

require('testdouble-jest')(td, jest);

let csvInvalid;
let store;
describe('openDialog', () => {
  beforeEach(() => {
    td.reset();

    store = td.replace('../../store', {
      store: {
        dispatch: td.function(),
      },
    });

    csvInvalid = require('../csv-invalid');
  });

  it('calls store.dispatch with an error message', async () => {
    const errorMessage = 'an error';
    csvInvalid(errorMessage);
    td.verify(store.store.dispatch(notification(errorMessage)));
  });
});
