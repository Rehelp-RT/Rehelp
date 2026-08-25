'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        idHelp: {
            type: DataTypes.INTEGER,
            references: { model: db.Help, key: 'id' }
        },
        idResponse: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'HelpResponses', key: 'id' }
        },
        idAuthor: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        body: DataTypes.STRING,
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Message.associate = function(models) {
        models.Message.belongsTo(models.Help, {
            onDelete: "CASCADE",
            foreignKey: 'idHelp',
            as: 'help'
        });
        models.Message.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idAuthor',
            as: 'author'
        });
        models.Message.belongsTo(models.HelpResponse, {
            foreignKey: 'idResponse',
            as: 'response'
        });
    };

    return Message;
};