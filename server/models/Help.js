'use strict';
module.exports = (sequelize, DataTypes) => {
  const Help = sequelize.define('Help', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    id_category: DataTypes.INTEGER
  }, {});
  Help.associate = function(models) {
    // associations can be defined here
  };
  return Help;
};