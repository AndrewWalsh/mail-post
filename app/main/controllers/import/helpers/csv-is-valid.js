// Custom validation parser for CSV files designed for pure speed
// @flow
import readline from 'readline';
import fs from 'fs';

const split = (str: string) => str.split(',');

const rowHasError = (line: string, headerLength: number) => {
  // If line has too many/few columns compared to header, reject
  if (split(line).length !== headerLength) {
    return `The following row has greater or fewer columns than the header: ${line}`;
  }
  return false;
};

const headerHasError = (header: string) => {
  // First column must be "email" or "Email"
  const firstColumn = header.split(',')[0];
  if (firstColumn.toLowerCase() !== 'email') return `The first column must be "email" or "Email", it is currently ${firstColumn}`;
  return false;
};

const onError = (rl, reject, err) => {
  reject(err);
  rl.close();
};

export default (csvPath: string): Promise<any> => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(csvPath),
  });

  let headerLength;
  rl.on('line', (line) => {
    if (!headerLength) {
      const err = headerHasError(line);
      if (err) onError(rl, reject, err);
      else headerLength = split(line).length;
    } else {
      const err = rowHasError(line, headerLength);
      if (err) onError(rl, reject, err);
    }
  });

  rl.on('close', () => {
    resolve();
  });
});
