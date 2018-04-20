import td from 'testdouble';

require('testdouble-jest')(td, jest);

const csvPath = 'abc';
const name = 'a name';
let csvImport;
let csvIsValid;
let importCsv;
describe('csv-import', () => {
  beforeEach(() => {
    const noop = () => {};
    importCsv = td.function();
    csvIsValid = td.function();
    csvImport = require('../csv-import')({ debug: noop, importCsv, csvIsValid });
  });

  afterEach(() => {
    td.reset();
  });

  it('when csvIsValid resolves importCsv is called', async () => {
    td.when(csvIsValid(csvPath)).thenResolve();
    await csvImport(csvPath, name);
    td.verify(importCsv(csvPath, name));
  });
});
