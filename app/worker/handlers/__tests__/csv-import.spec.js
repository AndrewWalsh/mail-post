import td from 'testdouble';
import csvImportModule from '../csv-import';

require('testdouble-jest')(td, jest);

describe('csv-import', () => {
  const csvPath = 'abc';
  const name = 'a name';
  let csvImport;
  let csvIsValid;
  let importCsv;

  beforeEach(() => {
    const noop = () => {};
    importCsv = td.function();
    csvIsValid = td.function();
    csvImport = csvImportModule({ debug: noop, importCsv, csvIsValid });
  });

  afterEach(() => {
    td.reset();
  });

  it('when csvIsValid resolves importCsv is called', async () => {
    td.when(csvIsValid(csvPath)).thenResolve();
    await csvImport(csvPath, name);
    td.verify(importCsv(csvPath, name));
  });

  it('when csvIsValid rejects, its error is thrown', async () => {
    const errMsg = 'err';
    const error = new Error(errMsg);
    td.when(csvIsValid(csvPath)).thenReject(errMsg);
    await expect(csvImport(csvPath, name)).rejects.toEqual(error);
  });

  it('when csvIsValid rejects importCsv is not called', async () => {
    td.when(csvIsValid(csvPath)).thenReject();
    try {
      await csvImport(csvPath, name);
    } catch (e) {
      td.verify(importCsv(td.matchers.anything()), { times: 0 });
    }
  });

  it('when importCsv rejects, its error is thrown', async () => {
    const errMsg = 'err';
    const error = new Error(errMsg);
    td.when(csvIsValid(csvPath)).thenResolve();
    td.when(importCsv(csvPath, name)).thenReject(errMsg);
    await expect(csvImport(csvPath, name)).rejects.toEqual(error);
  });

  it('when both importCsv and csvIsValid resolve, csv-import resolves', async () => {
    td.when(csvIsValid(csvPath)).thenResolve();
    td.when(importCsv(csvPath, name)).thenResolve();
    await expect(csvImport(csvPath, name)).resolves.toBe();
  });
});
