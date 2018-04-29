import td from 'testdouble';
import mockFs from 'mock-fs';
import uuidv4 from 'uuid/v4';
import EventEmitter from 'events';

// Run in parallel, this test will create more listeners than the default limit of 11
EventEmitter.defaultMaxListeners = 0;

require('testdouble-jest')(td, jest);

describe('csv-is-valid', () => {
  const mockCsv = (headers, numRows = 100) => {
    const rows = [];
    rows.push(`${headers.join(',')}\n`);
    for (let i = 0; i < numRows; i += 1) {
      rows.push(`${uuidv4()}@email.com${headers.slice(1).map(() => ',a').join('')}\n`);
    }
    return rows.join('');
  };
  const fakeFilePath = '/test/dir/test-csv.csv';
  let csvIsValid;

  beforeEach(() => {
    csvIsValid = require('../csv-is-valid');
  });

  afterEach(() => {
    td.reset();
    mockFs.restore();
  });

  it('resolves if csv is valid', () => {
    const csv = mockCsv(['email']);
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).resolves.toBe();
  });

  it('rejects if csv header length does not match all row lengths', () => {
    let csv = mockCsv(['email', 'test', 'another test']);
    csv = `${csv}bad`;
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).rejects.toThrow('Line 102 has greater or fewer columns than the header');
  });

  it('rejects if first header is not "email" or "Email"', () => {
    const csv = mockCsv(['notEmail']);
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).rejects.toThrow('The first column must be "email" or "Email", it is currently notEmail');
  });

  it('rejects if an email is not valid', () => {
    let csv = mockCsv(['email']);
    csv = `${csv}email@email..com`;
    mockFs({ '/test/dir': { 'test-csv.csv': csv } });
    return expect(csvIsValid(fakeFilePath)).rejects.toThrow('Line 102 contains an invalid email: email@email..com');
  });
});
