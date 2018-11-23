'use strict';
module.exports = (sequelize, DataTypes) => {
  var Campaign = sequelize.define('Campaign', {
    campaignName: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.STRING,
    plaintext: DataTypes.BOOLEAN,
    slug: DataTypes.STRING,
    unsubscribe: DataTypes.BOOLEAN
  }, {});
  Campaign.associate = function(models) {
    Campaign.belongsTo(models.List);
  };
  return Campaign;
};
