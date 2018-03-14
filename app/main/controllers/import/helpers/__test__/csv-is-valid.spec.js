// @flow
import td from 'testdouble';
import mockFs from 'mock-fs';
import uuidv4 from 'uuid/v4';

require('testdouble-jest')(td, jest);

const mockCsv = (headers: Array<string>, numRows: number = 100) => {
  const rows = [];
  rows.push(`${headers.join(',')}\n`);
  for (let i = 0; i < numRows; i += 1) {
    rows.push(`${uuidv4()}@email.com${headers.slice(1).map(() => ',a').join('')}\n`);
  }
  return rows.join('');
};

const fakeFilePath = '/test/dir/test-csv.csv';

let csvIsValid: any;
describe('csv-is-valid', () => {
  beforeEach(() => {
    csvIsValid = require('../csv-is-valid');
  });

  afterEach(() => {
    td.reset();
    mockFs.restore();
  });

  it('resolves if csv is valid and first header is "email" or "Email"', () => {
    const csv = mockCsv(['email']);
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).resolves.toBe();
  });

  it('rejects if first header is not "email" or "Email"', () => {
    const csv = mockCsv(['notEmail']);
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).rejects.toThrow('The first column must be "email" or "Email", it is currently notEmail');
  });
});
