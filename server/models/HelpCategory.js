'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {

    const HelpCategory = sequelize.define('HelpCategory', {
        idParent: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpCategory,
                key: 'id',
                as: 'parent'
            }
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {});

    HelpCategory.associate = function(models) {
        models.HelpCategory.hasMany(models.Help, {
            foreignKey: 'idCategory',
            as: 'helps'
        });
    };

    HelpCategory.associate = function(models) {
        models.HelpCategory.hasMany(models.HelpCategory, {
            foreignKey: 'idParent',
            as: 'children'
        });
    };

    return HelpCategory;
};
