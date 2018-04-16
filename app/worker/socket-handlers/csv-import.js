// @flow
import { CSV_INVALID } from '../../lib/websocket';
import { importCsv } from '../controllers';
import { csvIsValid } from './helpers';
import { debug } from '../utils';

export default async (csvPath: string, socket: any) => {
  try {
    await csvIsValid(csvPath);
  } catch (e) {
    debug(`${csvPath} is invalid`);
    socket.emit(CSV_INVALID, e);
    return;
  }

  try {
    debug(`${csvPath} is valid`);
    await importCsv(csvPath);
    debug(`${csvPath} imported`);
  } catch (e) {
    debug(`${e.message} error importing csv`);
  }
};
