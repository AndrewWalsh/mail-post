/**
 *
 * Parses a CSV file and writes each email to a local db.
 */
import csvParser from 'csv-parser';
import fs from 'fs';
import { compose, dissoc, keys } from 'ramda';

import { logListNameInvalidOnCsvImport } from '../../../lib/logging';
import createList from './create-list';
import { NOTIFICATION_TYPE_UPDATE } from '../../../lib/shared-constants';

const db = require('../../../main/models');

const upsertUnderTransaction = (Model, sequelize, belongsToInstance) => (arr) => {
  if (Array.isArray(arr)) {
    return sequelize.transaction(() => Promise.all([
      ...arr.map(values => Model.find({
        where: { email: values.email },
      })
        .then((instance) => {
          if (!instance) {
            return Model.create({ ...values });
          }
          /* eslint-disable no-param-reassign */
          if (values.template_data) {
            if (instance.template_data) {
              instance.template_data = { ...instance.template_data, ...values.template_data };
            } else instance.template_data = values.template_data;
          }
          /* eslint-enable no-param-reassign */
          return instance.save();
        })
        .then(instance => instance.addLists(belongsToInstance))),
    ]));
  }
  return arr;
};

const getEmailBuffer = (maxSize = 1) => {
  let arr = [];
  return (val, flush = false) => {
    // Arr contains maxSize items
    const bufferFull = arr.length >= maxSize;
    // Command to flush remaining items received
    const shouldFlush = flush && arr.length;
    if (bufferFull || shouldFlush) {
      const newArr = arr.slice();
      arr = [];
      return newArr;
    }

    if (val) arr.push(val);
    return null;
  };
};

const formatDataForUpsert = (data) => {
  const values = {};
  const emailKey = data.email ? 'email' : 'Email';
  values.email = data[emailKey];
  const templateData = dissoc(emailKey, data);
  if (keys(templateData).length) values.template_data = JSON.stringify(templateData);
  return values;
};

export default (csvPath, name, totalEmails, notification) => new Promise(async (resolve) => {
  if (!name) return;
  let list;
  try {
    list = await createList(name);
  } catch (e) {
    logListNameInvalidOnCsvImport(e);
    return;
  }

  const upsert = upsertUnderTransaction(db.Subscriber, db.sequelize, list);
  const buffer = getEmailBuffer();

  const save = compose(
    upsert,
    buffer,
  );

  let currentEmailCount = 0;
  const readStream = fs.createReadStream(csvPath);
  const writeCsvParser = csvParser({ strict: true });
  readStream
    .pipe(writeCsvParser)
    .on('data', async (data) => {
      currentEmailCount += 1;
      const transaction = save(formatDataForUpsert(data));
      if (transaction) {
        readStream.unpipe(writeCsvParser);
        readStream.pause();
        await transaction;
        if (currentEmailCount % 1000 === 0) {
          const percent = Math.floor(currentEmailCount / totalEmails * 100);
          notification(percent)(NOTIFICATION_TYPE_UPDATE);
        }
        readStream.pipe(writeCsvParser);
        readStream.resume();
      }
    })
    .on('end', async () => {
      notification(100)(NOTIFICATION_TYPE_UPDATE);
      // Flush remaining emails
      await save(null, true);
      // Mark all lists and list subscribers as 'finalised'
      await db.sequelize.transaction(transaction => Promise.all([
        list.update({
          finalised: true,
          total_subscribers: totalEmails,
        }, { transaction }),
        db.sequelize.query(
          `UPDATE Subscribers SET finalised=1 WHERE EXISTS (SELECT * FROM ListSubscribers WHERE (ListSubscribers.subscriberId = Subscribers.id) AND (ListSubscribers.listId = ${list.get({ plain: true }).id}))`,
          { transaction },
        ),
      ]));
      resolve();
    });
});
