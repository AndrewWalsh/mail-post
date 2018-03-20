/**
 *
 * Parses a CSV file and writes each email to a local db.
 */
import csvParser from 'csv-parser';
import fs from 'fs';
import { compose, dissoc, keys } from 'ramda';

import db from '../../models';
import { initialiseList } from './helpers';
import { getCurrentUser } from '../../utils';

const upsertUnderTransaction = (Model, sequelize, belongsToInstance) => (arr) => {
  if (Array.isArray(arr)) {
    return sequelize.transaction(transaction =>
      Promise.all([
        ...arr.map(values =>
          Model.findOrCreate({
            where: { email: values.email },
            defaults: values,
            transaction,
          })
            .spread((instance, created) => {
              instance.addList(belongsToInstance);
              if (!created) {
                // eslint-disable-next-line no-param-reassign
                instance.template_data = values.template_data;
              }
              return instance.save();
            })),
      ]));
  }
  return arr;
};

const getEmailBuffer = (maxSize = 10000) => {
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

export default async (csvPath: string) => { // eslint-disable-line
  const { username } = await getCurrentUser(); // eslint-disable-line
  const list = await initialiseList('list');

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
    .on('end', () => {
      save(null, true);
    });
};
