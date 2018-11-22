'use strict';
module.exports = (sequelize, DataTypes) => {
  var Setting = sequelize.define('Setting', {
    amazonSESkey: DataTypes.STRING,
    amazonSESSecretKey: DataTypes.STRING,
    amazonRegion: DataTypes.STRING,
    amazonWhiteLabelUrl: DataTypes.STRING,
    amazonEmail: DataTypes.STRING
  }, {});
  Setting.associate = function(models) {
    List.belongsTo(models.User);
  };
  return Setting;
};
