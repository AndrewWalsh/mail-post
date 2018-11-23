import uuidv4 from 'uuid/v4';

import { pubsubNotification } from '../facade';
import {
  NOTIFICATION_TYPE_ADD,
  NOTIFICATION_TYPE_UPDATE,
  NOTIFICATION_TYPE_REMOVE,
} from '../../lib/shared-constants';

export default ({ debug, importCsv, csvIsValid }) => async (csvPath, name) => {
  const partialNotificationId = pubsubNotification(uuidv4());
  const partialNotificationText = partialNotificationId('Importing CSV ...');
  partialNotificationId('Validating CSV ...')(null)(NOTIFICATION_TYPE_ADD);
  try {
    const totalEmails = await csvIsValid(csvPath);
    partialNotificationText(0)(NOTIFICATION_TYPE_UPDATE);
    debug(`${csvPath} is valid`);
    await importCsv(csvPath, name, totalEmails, partialNotificationText);
    partialNotificationText(100)(NOTIFICATION_TYPE_REMOVE);
    debug(`${csvPath} imported`);
  } catch (e) {
    partialNotificationId(e)(null)(NOTIFICATION_TYPE_REMOVE);
    debug(`${e} error importing csv`);
    throw new Error(e);
  }
};
