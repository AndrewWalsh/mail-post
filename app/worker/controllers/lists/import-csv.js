/**
 *
 * Parses a CSV file and writes each email to a local db.
 */
import csvParser from 'csv-parser';
import fs from 'fs';
import { compose, dissoc, keys } from 'ramda';

import { logListNameInvalidOnCsvImport } from '../../../lib/logging';
import createList from './create-list';

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

const getEmailBuffer = (maxSize = 5000) => {
  let arr = [];
  return (val, flush = false) => {
    if (arr.length >= maxSize) arr = [];
    if (flush && arr.length) return arr;
    if (val) arr.push(val);
    if (arr.length >= maxSize) {
      return arr;
    }
    return null;
  };
};

const formatDataForUpsert = (data) => {
  const values = {};
  const emailKey = data.email ? 'email' : 'Email';
  values.email = data[emailKey];
  const templateData = dissoc(emailKey, data); // Returns object without emailKey
  if (keys(templateData).length) values.template_data = JSON.stringify(templateData);
  return values;
};

export default (csvPath, name) => new Promise(async (resolve) => {
  // Name must not be an empty string, this is validated client-side
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

  let totalSubscribers = 0;
  const readStream = fs.createReadStream(csvPath);
  readStream
    .pipe(csvParser({ strict: true }))
    .on('data', async (data) => {
      totalSubscribers += 1;
      const transaction = save(formatDataForUpsert(data));
      if (transaction) {
        readStream.pause();
        await transaction;
        readStream.resume();
      }
    })
    .on('end', async () => {
      // Flush remaining emails
      await save(null, true);
      // Mark all lists and list subscribers as 'finalised'
      await db.sequelize.transaction(transaction => Promise.all([
        list.update({
          finalised: true,
          total_subscribers: totalSubscribers,
        }, { transaction }),
        db.sequelize.query(
          `UPDATE Subscribers SET finalised=1 WHERE EXISTS (SELECT * FROM ListSubscribers WHERE (ListSubscribers.subscriberId = Subscribers.id) AND (ListSubscribers.listId = ${list.get({ plain: true }).id}))`,
          { transaction },
        ),
      ]));
      resolve();
    });
});
