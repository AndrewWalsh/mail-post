import fs from 'fs';
import csvParser from 'csv-parser';

import { logListNameInvalidOnCsvImport } from '../../../../lib/logging';
import createList from '../create-list';

import importCsv from './import-csv';
import streamCsv from './stream-csv';

const db = require('../../../../main/models');

const importCsvApplied = importCsv(db, createList, logListNameInvalidOnCsvImport);

export default (csvPath, name, totalEmails, notification) => {
  const readStream = fs.createReadStream(csvPath);
  const writeStream = csvParser({ strict: true });
  const minBufferSize = 1000;

  const stream = streamCsv(readStream, writeStream, minBufferSize);

  return importCsvApplied(stream, name, totalEmails, notification);
};
