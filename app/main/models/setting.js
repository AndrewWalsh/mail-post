'use strict';
module.exports = (sequelize, DataTypes) => {
  var Setting = sequelize.define('Setting', {
    amazonSESkey: { type: DataTypes.STRING, defaultValue: '' },
    amazonSESSecretKey: { type: DataTypes.STRING, defaultValue: '' },
    amazonRegion: { type: DataTypes.STRING, defaultValue: '' },
    amazonWhiteLabelUrl: { type: DataTypes.STRING, defaultValue: '' },
    amazonEmail: { type: DataTypes.STRING, defaultValue: '' },
  }, {});
  Setting.associate = function(models) {
    Setting.belongsTo(models.User);
  };
  return Setting;
};
