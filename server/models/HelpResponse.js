'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const HelpResponse = sequelize.define('HelpResponse', {
        idHelp: {
            type: DataTypes.INTEGER,
            references: { model: db.Help, key: 'id' }
        },
        idResponder: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        idTradeType: DataTypes.INTEGER,
        isTutor: DataTypes.BOOLEAN,
        accepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        reviewed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        message: DataTypes.STRING,

        acceptedAt: DataTypes.DATE,
        canceledAt: DataTypes.DATE,
        creatorReviewedAt: DataTypes.DATE,
        responderReviewedAt: DataTypes.DATE,
        completedAt: DataTypes.DATE,

        messageCreator: DataTypes.STRING,
        messageResponder: DataTypes.STRING,
        ratingCreator: DataTypes.INTEGER,
        ratingResponder: DataTypes.INTEGER
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
