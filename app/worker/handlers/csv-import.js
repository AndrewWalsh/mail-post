import uuidv4 from 'uuid/v4';

import { pubsubNotification } from '../facade';
import {
  NOTIFICATION_TYPE_ADD,
  // NOTIFICATION_TYPE_UPDATE,
  NOTIFICATION_TYPE_REMOVE,
} from '../../lib/shared-constants';

export default ({ debug, importCsv, csvIsValid }) => async (csvPath, name) => {
  const paNotificationId = pubsubNotification(uuidv4());
  paNotificationId('Importing CSV ...')(null)(NOTIFICATION_TYPE_ADD);
  try {
    await csvIsValid(csvPath);
    debug(`${csvPath} is valid`);
    await importCsv(csvPath, name);
    debug(`${csvPath} imported`);
  } catch (e) {
    paNotificationId(e)(null)(NOTIFICATION_TYPE_REMOVE);
    debug(`${e} error importing csv`);
    throw new Error(e);
  }
};
