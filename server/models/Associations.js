'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Associations = sequelize.define('Associations', {
        name: DataTypes.STRING,
        secreteId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Associations.associate = function(models) {
      models.Associations.hasMany(models.Help, {
          foreignKey: 'idDonateTo',
          as: 'helps'
      });
  };

    return Associations;
};