import uuidv4 from 'uuid/v4';

import { pubsubNotification } from '../../facade';
import {
  NOTIFICATION_TYPE_ADD,
  NOTIFICATION_TYPE_REMOVE,
} from '../../../lib/shared-constants';

const db = require('../../../main/models');

export default async ({
  name,
  subject,
  body,
  listId,
}) => {
  const list = await db.List.find({ where: { id: listId } });
  if (!list) throw new Error('List does not exist.');

  return db.Campaign.create({
    name,
    subject,
    body,
    listId: list.get('id'),
  })
    .then((instance) => {
      const uuid = uuidv4();
      const text = `Created camapign "${instance.get('name')}"`;
      pubsubNotification(uuid, text, null, NOTIFICATION_TYPE_ADD);
      const cb = () => pubsubNotification(uuid, text, null, NOTIFICATION_TYPE_REMOVE);
      setTimeout(cb, 5000);
      instance.setList(list);
      return instance.save();
    });
};
