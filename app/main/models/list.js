'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    name: { type: DataTypes.STRING, unique: true },
    total_users: { type: DataTypes.INTEGER, defaultValue: 0 },
    finalised: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {});
  List.associate = function(models) {
    List.belongsToMany(models.Subscriber, { through: 'ListSubscriber' });
  };
  return List;
};
