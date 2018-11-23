import DbMock from 'sequelize-mock';

import { NOTIFICATION_TYPE_UPDATE } from '../../../../../lib/shared-constants';
import importCsv from '../import-csv';

const dbMock = new DbMock();

const SubscriberMock = require('../../../../../main/models/subscriber')(dbMock, dbMock.Sequelize);
const ListMock = require('../../../../../main/models/subscriber')(dbMock, dbMock.Sequelize);

SubscriberMock.Instance.prototype.addLists = jest.fn();

const mockGetLines = (jest, runTimes, mockEmails) => {
  let timesRun = 0;
  return (...args) => {
    timesRun += 1;
    const finished = timesRun > runTimes;
    return jest.fn().mockResolvedValue(finished ? [] : mockEmails)(...args);
  };
};

describe('import-csv', () => {
  const name = 'some-list-name';
  let db;
  let createList;
  let logListNameInvalidOnCsvImport;
  let stream;
  let notificationMock;
  let notification;
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
    notificationMock = jest.fn();
    notification = a => b => notificationMock(a, b);
  });

  it('creates a new list with the given name', async () => {
    const args = [stream, name, 0, notification];
    await importCsv(db, createList, logListNameInvalidOnCsvImport)(...args);
    expect(createList).toHaveBeenCalledWith(name);
  });

  it('rejects and calls logListNameInvalidOnCsvImport when list name is invalid', async () => {
    const error = new Error('some error');
    createList = jest.fn().mockRejectedValue(error);
    const args = [stream, name, 0, notification];
    const sut = importCsv(db, createList, logListNameInvalidOnCsvImport)(...args);
    await expect(sut).rejects.toBe(error);
    expect(logListNameInvalidOnCsvImport).toHaveBeenCalledWith(error);
  });

  it('resolves when stream ends', () => {
    const mockEmails = [
      { email: 'hello@email.com' },
      { email: 'hello1@email.com' },
      { email: 'hello2@email.com' },
    ];
    const runTimes = 3;
    const getLines = mockGetLines(jest, runTimes, mockEmails);
    stream = { getLines };
    const args = [stream, name, 0, notification];
    const sut = importCsv(db, createList, logListNameInvalidOnCsvImport)(...args);
    expect(sut).resolves.toBe();
  });

  it('calls notification with correct % value', async () => {
    const mockEmails = [
      { email: 'hello@email.com' },
    ];
    const runTimes = 1;
    const getLines = mockGetLines(jest, runTimes, mockEmails);
    stream = { getLines };
    const scopedNotificationMock = jest.fn();
    const scopedNotification = a => b => scopedNotificationMock(a, b);
    const args = [stream, name, 2, scopedNotification];
    await importCsv(db, createList, logListNameInvalidOnCsvImport)(...args);
    expect(scopedNotificationMock).toHaveBeenNthCalledWith(1, 50, NOTIFICATION_TYPE_UPDATE);
    expect(scopedNotificationMock).toHaveBeenNthCalledWith(2, 100, NOTIFICATION_TYPE_UPDATE);
  });
});
