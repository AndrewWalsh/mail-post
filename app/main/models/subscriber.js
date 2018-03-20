'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscriber = sequelize.define('Subscriber', {
    email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true },
    template_data: { type: DataTypes.JSON, defaultValue: null, allowNull: true },
    has_unsubscribed: { type: DataTypes.BOOLEAN, defaultValue: false },
    finalised: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {});
  Subscriber.associate = function(models) {
    Subscriber.belongsToMany(models.List, { through: 'ListSubscriber' });
  };
  return Subscriber;
};
