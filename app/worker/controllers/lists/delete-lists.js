import db from '../../../main/models';

export default async (ids) => {
  try {
    await Promise.all(ids.map(id => db.List.destroy({ where: { id } })));
  } catch (e) {
    throw new Error(e);
  }
};
