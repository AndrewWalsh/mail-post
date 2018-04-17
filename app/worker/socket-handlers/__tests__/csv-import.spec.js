import td from 'testdouble';
import { CSV_INVALID } from '../../../lib/websocket';

require('testdouble-jest')(td, jest);

const noop = () => {};

const csvPath = 'abc';
const name = 'a name';
let csvImport;
let csvIsValid;
let importCsv;
let socket;
describe('csv-import', () => {
  beforeEach(() => {
    importCsv = td.function();
    csvIsValid = td.function();
    socket = { emit: td.function() };
    csvImport = require('../csv-import')({ debug: noop, importCsv, csvIsValid });
  });

  afterEach(() => {
    td.reset();
  });

  it('when csvIsValid resolves socket.emit is NOT called', async () => {
    td.when(csvIsValid(csvPath)).thenResolve();
    await csvImport({ csvPath, name }, socket);
    td.verify(socket.emit(td.matchers.anything()), { times: 0 });
  });

  it('when csvIsValid rejects socket.emit is called with the channel CSV_INVALID and the error', async () => {
    const errorMessage = 'an error';
    td.when(csvIsValid(csvPath)).thenReject(errorMessage);
    await csvImport({ csvPath, name }, socket);
    td.verify(socket.emit(CSV_INVALID, errorMessage));
  });

  it('when csvIsValid resolves importCsv is called', async () => {
    td.when(csvIsValid(csvPath)).thenReject();
    await csvImport({ csvPath, name }, socket);
    td.verify(importCsv(td.matchers.anything()), { times: 0 });
  });

  it('when csvIsValid rejects importCsv is NOT called', async () => {
    td.when(csvIsValid({ csvPath, name })).thenResolve();
    await csvImport({ csvPath, name }, socket);
    td.verify(importCsv(csvPath, name));
  });
});
