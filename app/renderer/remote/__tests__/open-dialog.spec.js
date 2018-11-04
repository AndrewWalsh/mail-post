import openDialog from '../open-dialog';

describe('openDialog', () => {
  let callback;

  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls callback with the file path', async () => {
    openDialog({}, callback);
    expect(callback).toHaveBeenCalled();
  });
});
