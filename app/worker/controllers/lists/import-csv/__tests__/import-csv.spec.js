import DbMock from 'sequelize-mock';

import importCsv from '../import-csv';

const dbMock = new DbMock();

const SubscriberMock = require('../../../../../main/models/subscriber')(dbMock, dbMock.Sequelize);
const ListMock = require('../../../../../main/models/subscriber')(dbMock, dbMock.Sequelize);

// SubscriberMock.addLists = jest.fn();

SubscriberMock.Instance.prototype.addLists = jest.fn();

describe('import-csv', () => {
  const name = 'some-list-name';
  let db;
  let createList;
  let logListNameInvalidOnCsvImport;
  let stream;
  beforeEach(() => {
    db = {
      sequelize: {
        transaction: fn => fn(),
        query: jest.fn(),
      },
      Subscriber: SubscriberMock,
    };
    createList = jest.fn().mockResolvedValue(ListMock.create(name));
    logListNameInvalidOnCsvImport = jest.fn();
    stream = { getLines: jest.fn().mockResolvedValue([]) };
  });

  it('creates a new list with the given name', async () => {
    await importCsv(db, createList, logListNameInvalidOnCsvImport)(stream, name);
    expect(createList).toHaveBeenCalledWith(name);
  });

  it('rejects and calls logListNameInvalidOnCsvImport when list name is invalid', async () => {
    const error = new Error('some error');
    createList = jest.fn().mockRejectedValue(error);
    const sut = importCsv(db, createList, logListNameInvalidOnCsvImport)(stream, name);
    await expect(sut).rejects.toBe(error);
    expect(logListNameInvalidOnCsvImport).toHaveBeenCalledWith(error);
  });

  it('resolves when stream ends', async () => {
    const mockEmails = [
      { email: 'hello@email.com' },
      { email: 'hello1@email.com' },
      { email: 'hello2@email.com' },
    ];
    const runTimes = 3;
    const getLines = () => {
      let timesRun = 0;
      return (...args) => {
        timesRun += 1;
        const finished = timesRun > runTimes;
        return jest.fn().mockResolvedValue(finished ? [] : mockEmails)(...args);
      };
    };
    stream = { getLines: getLines() };
    const sut = importCsv(db, createList, logListNameInvalidOnCsvImport)(stream, name);
    expect(sut).resolves.toBe();
  });
});
