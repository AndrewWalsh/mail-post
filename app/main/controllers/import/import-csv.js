/**
 * @flow
 * Parses a CSV file and writes each email to a local db.
 */
// import csvParser from 'csv-parser';
import { initialiseList } from './helpers';

import { getCurrentUser } from '../../utils';

export default async (csvPath: string) => { // eslint-disable-line
  const { username } = await getCurrentUser(); // eslint-disable-line
  const list = await initialiseList('list');
  console.log(list);
  // const readStream = fs.createReadStream(csvPath);
  // readStream
  //   .pipe(csvParser({ strict: true }))
  //   .on('headers', (header) => {

  //   })
  //   .on('error', (err) => {

  //   })
  //   .on('data', (data) => {
  //     const err = rowHasError(data, lineNumber);
  //     lineNumber += 1;
  //     if (err) onError(readStream, reject, err);
  //   })
  //   .on('end', () => {
  //     resolve();
  //   });
};
