'use strict';
module.exports = (sequelize, DataTypes) => {
  const Help = sequelize.define('Help', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
  }, {});
  Help.associate = function(models) {
    // associations can be defined here
  };
  return Help;
};