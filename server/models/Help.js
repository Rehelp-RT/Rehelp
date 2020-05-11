'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {

    const Help = sequelize.define('Help', {
        idType: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpType,
                key: 'id',
                as: 'type'
            }
        },
        idCategory: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpCategory,
                key: 'id',
                as: 'category'
            }
        },
        idCreator: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
                as: 'creator'
            }
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        halfhourValidity: DataTypes.INTEGER,
        dateStartValidity: DataTypes.DATE,
        dateEndValidity: DataTypes.DATE,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        address: DataTypes.STRING,
        shareType: DataTypes.STRING,

        accepted: DataTypes.BOOLEAN,
        reviewed: DataTypes.BOOLEAN,
        completed: DataTypes.BOOLEAN,

        isOffer: DataTypes.BOOLEAN
    }, {});

    Help.associate = function(models) {
        models.Help.belongsTo(models.HelpType, {
            onDelete: "CASCADE",
            foreignKey: 'idType',
            as: 'type'
        });
        models.Help.belongsTo(models.HelpCategory, {
            onDelete: "CASCADE",
            foreignKey: 'idCategory',
            as: 'category'
        });
        models.Help.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idCreator',
            as: 'creator'
        });
        models.Help.hasMany(models.HelpResponse, {
            foreignKey: 'idHelp',
            as: 'responses'
        });
        models.Help.hasMany(models.Notification, {
            foreignKey: 'idHelp',
            as: 'notifications'
        });
    };

    return Help;
};
