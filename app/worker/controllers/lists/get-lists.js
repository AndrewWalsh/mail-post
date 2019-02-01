/* eslint-disable camelcase */
const db = require('../../../main/models');

export default (name = null) => {
  const options = {
    where: {
      finalised: true,
    },
    raw: true,
  };

  if (name) {
    options.where.name = name;
  }

  return db.List.findAll(options).then((instances) => {
    if (!instances || !instances.length) return [];
    return instances;
  }).then(lists => lists.map(({
    total_subscribers,
    name: nameShadow,
    id,
    createdAt,
  }) => ({
    total_subscribers,
    name: nameShadow,
    id,
    createdAt,
  })));
};
