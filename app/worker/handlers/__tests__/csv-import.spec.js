import td from 'testdouble';
import csvImportModule from '../csv-import';

describe('csv-import', () => {
  const csvPath = 'abc';
  const name = 'a name';
  let csvImport;
  let csvIsValid;
  let importCsv;

  beforeEach(() => {
    const noop = () => {};
    importCsv = jest.fn();
    csvIsValid = jest.fn();
    csvImport = csvImportModule({ debug: noop, importCsv, csvIsValid });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('when csvIsValid resolves importCsv is called', async () => {
    csvIsValid.mockResolvedValue();
    await csvImport(csvPath, name);
    expect(importCsv).toHaveBeenCalledWith(csvPath, name);
  });

  it('when csvIsValid rejects, its error is thrown', async () => {
    const errMsg = 'err';
    const error = new Error(errMsg);
    csvIsValid.mockRejectedValue(errMsg);
    await expect(csvImport(csvPath, name)).rejects.toEqual(error);
  });

  it('when csvIsValid rejects importCsv is not called', async () => {
    csvIsValid.mockRejectedValue();
    try {
      await csvImport(csvPath, name);
    } catch (e) {
      expect(importCsv).toHaveBeenCalledTimes(0);
    }
  });

  it('when importCsv rejects, its error is thrown', async () => {
    const errMsg = 'err';
    const error = new Error(errMsg);
    csvIsValid.mockResolvedValue();
    importCsv.mockRejectedValue(errMsg);
    await expect(csvImport(csvPath, name)).rejects.toEqual(error);
  });

  it('when both importCsv and csvIsValid resolve, csv-import resolves', async () => {
    csvIsValid.mockResolvedValue();
    importCsv.mockResolvedValue();
    await expect(csvImport(csvPath, name)).resolves.toBe();
  });
});
