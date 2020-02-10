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
        id_creator: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
            }
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        halfhourValidity: DataTypes.INTEGER,
        dateStartValidity: DataTypes.DATE,
        dateEndValidity: DataTypes.DATE,
        dateCompletion: DataTypes.DATE,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        address: DataTypes.STRING
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
        models.Help.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'id_creator'
        });
        models.Help.hasMany(models.HelpResponse, {
            foreignKey: 'id_help',
            as: 'responses'
        });
    };

    return Help;
};