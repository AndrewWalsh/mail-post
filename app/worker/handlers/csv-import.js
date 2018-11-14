import { pubsubNotification } from '../facade';
import {
  NOTIFICATION_TYPE_ADD,
  // NOTIFICATION_TYPE_UPDATE,
  // NOTIFICATION_TYPE_REMOVE,
} from '../../lib/shared-constants';

export default ({ debug, importCsv, csvIsValid }) => async (csvPath, name) => {
  // const notification = { text: 'hi', type: 'good', id: 'abc' };
  pubsubNotification('testing')(NOTIFICATION_TYPE_ADD, 'testing 123');
  try {
    await csvIsValid(csvPath);
    debug(`${csvPath} is valid`);
    await importCsv(csvPath, name);
    debug(`${csvPath} imported`);
  } catch (e) {
    debug(`${e.message} error importing csv`);
    throw new Error(e);
  }
};
