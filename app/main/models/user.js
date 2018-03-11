
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
