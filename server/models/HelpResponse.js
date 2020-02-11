'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const HelpResponse = sequelize.define('HelpResponse', {
        id_help: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Help,
                key: 'id',
            }
        },
        id_responder: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
            }
        },
        id_tradeType: DataTypes.INTEGER,
        isTutor: DataTypes.BOOLEAN,
        accepted: DataTypes.BOOLEAN,
        completed: DataTypes.BOOLEAN,
        acceptedAt: DataTypes.DATE,
        canceledAt: DataTypes.DATE,
        completedAt: DataTypes.DATE,
        message: DataTypes.STRING
    }, {});

    HelpResponse.associate = function(models) {
        models.HelpResponse.belongsTo(models.Help, {
            onDelete: "CASCADE",
            foreignKey: 'idHelp',
            as: 'help'
        });
        models.HelpResponse.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idResponder',
            as: 'responder'
        });
    };

    return HelpResponse;
};