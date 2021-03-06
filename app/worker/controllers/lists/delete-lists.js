const db = require('../../../main/models');

export default async (ids) => {
  try {
    await Promise.all(ids.map(id => db.List.destroy({ where: { id } })));
    return ids;
  } catch (e) {
    throw new Error(e);
  }
};
