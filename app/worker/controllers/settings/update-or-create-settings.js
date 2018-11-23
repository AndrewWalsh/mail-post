const db = require('../../../main/models');

export default settings => db.Setting.findOrCreate({
  where: { id: 1 },
}).then(([instance]) => instance.update(settings));
