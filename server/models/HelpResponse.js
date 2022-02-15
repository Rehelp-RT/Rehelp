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
        idTradeType: {
            type: DataTypes.INTEGER,
            references: { model: db.TradeTypes, key: 'id' }
        },
        isTutor: DataTypes.BOOLEAN,
        accepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        reviewed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        posted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        message: DataTypes.STRING,
        postedAt: DataTypes.DATE,
        acceptedAt: DataTypes.DATE,
        canceledAt: DataTypes.DATE,
        creatorReviewedAt: DataTypes.DATE,
        responderReviewedAt: DataTypes.DATE,
        completedAt: DataTypes.DATE,

        imageReviewCreator: DataTypes.STRING,
        imageReviewResponder: DataTypes.STRING,
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
        models.HelpResponse.belongsTo(models.TradeType, {
            onDelete: "CASCADE",
            foreignKey: 'idTradeType',
            as: 'trade'
        });
    };

    return HelpResponse;
};
