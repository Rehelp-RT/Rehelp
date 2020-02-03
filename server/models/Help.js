'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {

    const Help = sequelize.define('Help', {
        id_type: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpType,
                key: 'id',
            }
        },
        id_category: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpCategory,
                key: 'id',
            }
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {});

    Help.associate = function(models) {
        models.Help.belongsTo(models.HelpType, {
            onDelete: "CASCADE",
            foreignKey: 'id_type'
        });
        models.Help.belongsTo(models.HelpCategory, {
            onDelete: "CASCADE",
            foreignKey: 'id_category'
        });
    };

    return Help;
};