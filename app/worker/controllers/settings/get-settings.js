const db = require('../../../main/models');

export default () => db.Setting.findOne({
  where: { id: 1 },
}).then((instance) => {
  console.log(instance);
  return instance;
});
