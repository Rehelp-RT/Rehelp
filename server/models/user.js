'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};