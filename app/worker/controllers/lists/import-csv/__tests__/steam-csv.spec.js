import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import { head, tail } from 'ramda';

import streamCsv from '../stream-csv';

const csvPath = path.resolve('test/csvs/10-emails.csv');

const emails = tail(
  fs.readFileSync(csvPath, 'utf-8')
    .split('\n')
    .filter(Boolean),
);

const requestIncrement = async (stream, timesToGet, linesToGet) => {
  const arr = [];
  for (let i = 0; i < timesToGet; i += 1) {
    const result = await stream.getLines(linesToGet); // eslint-disable-line no-await-in-loop
    arr.push(result);
  }
  return arr.map(x => head(x).email);
};

describe('stream-csv', () => {
  let readStream;
  let writeStream;
  beforeEach(() => {
    readStream = fs.createReadStream(csvPath);
    writeStream = csvParser({ strict: true });
  });

  it('returns specified number of emails', async () => {
    const bufferSize = 3;
    const stream = streamCsv(readStream, writeStream, bufferSize);
    const result = await stream.getLines(bufferSize);
    expect(result).toEqual([{ email: 'spalmar0@state.tx.us' }, { email: 'lartz1@webmd.com' }, { email: 'clazarus2@webmd.com' }]);
  });

  it('returns emails in requested increment', async () => {
    const bufferSize = 1;
    const emailsToRequest = 3;
    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, emailsToRequest, bufferSize);
    expect(results).toEqual(emails.slice(0, emailsToRequest));
  });

  xit('returns all emails in requested increment', async () => {
    const bufferSize = 1;
    const emailsToRequest = 10;
    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, emailsToRequest, bufferSize);
    expect(results).toEqual(emails.slice(0, emailsToRequest));
  });
});
