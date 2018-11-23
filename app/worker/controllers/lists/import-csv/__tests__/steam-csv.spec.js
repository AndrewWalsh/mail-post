import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import { tail } from 'ramda';

import streamCsv from '../stream-csv';

const csvPath = path.resolve('test/csvs/1k-emails.csv');

const emails = tail(
  fs.readFileSync(csvPath, 'utf-8')
    .split('\n')
    .filter(Boolean),
);

const numberEmailsInCsv = emails.length;

const requestIncrement = async (stream, timesToGet) => {
  const arr = [];
  for (let i = 0; i < timesToGet; i += 1) {
    const result = await stream.getLines(); // eslint-disable-line no-await-in-loop
    result.forEach(x => arr.push(x.email));
  }
  return arr;
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
    const timesToGet = 1;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, timesToGet);
    const expected = emails.slice(0, bufferSize);

    expect(results).toEqual(expected);
  });

  it('returns emails in requested increment', async () => {
    const bufferSize = 1;
    const timesToGet = 3;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, timesToGet);
    const expected = emails.slice(0, timesToGet);

    expect(results).toEqual(expected);
  });

  it('returns all emails in requested increment', async () => {
    const bufferSize = 2;
    const timesToGet = numberEmailsInCsv / bufferSize;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, timesToGet);
    const expected = emails.slice(0, numberEmailsInCsv);

    expect(results).toEqual(expected);
  });

  it('when more lines are requested than exist in the CSV, returns correct result', async () => {
    const bufferSize = 2;
    const timesToGet = numberEmailsInCsv + 100;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    const results = await requestIncrement(stream, timesToGet);
    const expected = emails.slice(0, numberEmailsInCsv);

    expect(results).toEqual(expected);
  });

  it('getTotal returns no.emails that have been parsed', async () => {
    const bufferSize = 10;
    const timesToGet = numberEmailsInCsv;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    await requestIncrement(stream, timesToGet);

    expect(stream.getTotal()).toBe(numberEmailsInCsv);
  });

  it('hasEnded returns true when stream has ended', async () => {
    const bufferSize = 10;
    const timesToGet = numberEmailsInCsv;

    const stream = streamCsv(readStream, writeStream, bufferSize);
    await requestIncrement(stream, timesToGet);

    expect(stream.hasEnded()).toBe(true);
  });

  it('prop minBufferSize is argument minBufferSize', async () => {
    const bufferSize = 10;
    const stream = streamCsv(readStream, writeStream, bufferSize);
    expect(stream.minBufferSize).toBe(bufferSize);
  });
});
