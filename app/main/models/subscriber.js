'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscriber = sequelize.define('Subscriber', {
    email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true },
    template_data: { type: DataTypes.JSON, defaultValue: null, allowNull: true },
    has_unsubscribed: { type: DataTypes.BOOLEAN, defaultValue: false },
    finalised: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['has_unsubscribed']
      }
    ]
  });
  Subscriber.associate = function(models) {
    Subscriber.belongsToMany(models.List, { through: 'ListSubscribers' });
  };
  return Subscriber;
};
