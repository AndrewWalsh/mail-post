// Custom validation parser for CSV files designed for pure speed
import csvParser from 'csv-parser';
import fs from 'fs';
import isEmail from 'isemail';

const rowHasError = (line, lineNumber) => {
  const emailHeader = line.email || line.Email;
  if (!emailHeader || !isEmail.validate(emailHeader)) {
    return `Line ${lineNumber} contains an invalid email: ${line.email}`;
  }
  return false;
};

const headerHasError = (header) => {
  // First column must be "email" or "Email"
  if (header[0].toLowerCase() !== 'email') return `The first column must be "email" or "Email", it is currently ${header[0]}`;
  return false;
};

const onError = (readStream, reject, err) => {
  reject(err);
  readStream.close();
};

export default csvPath => new Promise((resolve, reject) => {
  let lineNumber = 2; // Ignore header
  const readStream = fs.createReadStream(csvPath);
  readStream
    .pipe(csvParser({ strict: true }))
    .on('headers', (header) => {
      const err = headerHasError(header);
      if (err) onError(readStream, reject, new Error(err));
    })
    .on('error', (err) => {
      switch (err.message) {
        case 'Row length does not match headers': {
          reject(new Error(`Line ${lineNumber} has greater or fewer columns than the header`));
          readStream.close();
          break;
        }
        default:
      }
    })
    .on('data', (data) => {
      const err = rowHasError(data, lineNumber);
      lineNumber += 1;
      if (err) onError(readStream, reject, err);
    })
    .on('end', () => {
      resolve();
    });
});
