import { dissoc, keys } from 'ramda';

// import { NOTIFICATION_TYPE_UPDATE } from '../../../../lib/shared-constants';

const upsertUnderTransaction = (Model, sequelize, belongsToInstance) => arr =>
  sequelize.transaction(() => Promise.all([
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

const formatDataForUpsert = (data) => {
  const values = {};
  const emailKey = data.email ? 'email' : 'Email';
  values.email = data[emailKey];
  const templateData = dissoc(emailKey, data);
  if (keys(templateData).length) values.template_data = JSON.stringify(templateData);
  return values;
};

export default (db, createList, logListNameInvalidOnCsvImport) =>
  (stream, name) =>
    new Promise(async (resolve, reject) => {
      if (!name) return;
      let list;
      try {
        list = await createList(name);
      } catch (e) {
        logListNameInvalidOnCsvImport(e);
        reject(e);
        return;
      }

      const save = upsertUnderTransaction(db.Subscriber, db.sequelize, list);

      let count = 0;
      let emails = await stream.getLines();
      /* eslint-disable no-await-in-loop */
      while (emails.length) {
        count += emails.length;
        await save(emails.map(formatDataForUpsert));
        // const percent = Math.floor(currentEmailCount / totalEmails * 100);
        // notification(percent)(NOTIFICATION_TYPE_UPDATE);
        emails = await stream.getLines();
      }
      /* eslint-enable no-await-in-loop */

      // notification(100)(NOTIFICATION_TYPE_UPDATE);
      await db.sequelize.transaction(transaction => Promise.all([
        list.update({
          finalised: true,
          total_subscribers: count,
        }, { transaction }),
        db.sequelize.query(
          `UPDATE Subscribers SET finalised=1 WHERE EXISTS (SELECT * FROM ListSubscribers WHERE (ListSubscribers.subscriberId = Subscribers.id) AND (ListSubscribers.listId = ${list.get({ plain: true }).id}))`,
          { transaction },
        ),
      ]));

      resolve();
    });
