/* eslint-disable camelcase */
const db = require('../../../main/models');

export default (name = null) => {
  const options = {
    raw: true,
  };

  if (name) {
    options.where.name = name;
  }

  return db.Campaign.findAll(options).then((instances) => {
    if (!instances || !instances.length) return [];
    return instances;
  }).then(campaigns => campaigns.map(({
    name: nameShadow,
    subject,
    body,
    plaintext,
    slug,
    unsubscribe,
    listId,
    id,
    createdAt,
  }) => ({
    name: nameShadow,
    subject,
    body,
    plaintext,
    slug,
    unsubscribe,
    listId,
    id,
    createdAt,
  })));
};
