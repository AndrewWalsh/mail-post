'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    name: DataTypes.STRING,
    finalised: { type: DataTypes.BOOLEAN, defaultValue: false },
    total_users: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};
