/**
 *
 * Parses a CSV file and writes each email to a local db.
 */
import csvParser from 'csv-parser';
import fs from 'fs';
import { compose, dissoc, keys } from 'ramda';

import { logListNameInvalidOnCsvImport } from '../../../lib/logging';
import db from '../../../main/models';
import { initialiseList } from './helpers';

const upsertUnderTransaction = (Model, sequelize, belongsToInstance) => (arr) => {
  if (Array.isArray(arr)) {
    return sequelize.transaction(() =>
      Promise.all([
        ...arr.map(values =>
          Model.find({
            where: { email: values.email },
          })
            .then((instance) => {
              if (!instance) {
                return Model.create({ ...values });
              }
              // eslint-disable-next-line no-param-reassign
              instance.template_data = values.template_data;
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
  let list;
  try {
    list = await initialiseList(name);
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

  const readStream = fs.createReadStream(csvPath);
  readStream
    .pipe(csvParser({ strict: true }))
    .on('data', async (data) => {
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
      await db.sequelize.transaction(transaction =>
        Promise.all([
          list.update({ finalised: true }, { transaction }),
          db.sequelize.query(
            `UPDATE Subscribers SET finalised=1 WHERE EXISTS (SELECT * FROM ListSubscribers WHERE (ListSubscribers.subscriberId = Subscribers.id) AND (ListSubscribers.listId = ${list.get({ plain: true }).id}))`,
            { transaction },
          ),
        ]));
      resolve();
    });
});
