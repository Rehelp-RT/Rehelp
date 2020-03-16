'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        idResponse: {
            type: DataTypes.INTEGER,
            references: { model: db.HelpResponse, key: 'id' }
        },
        idAuthor: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        body: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Message.associate = function(models) {
        models.Message.belongsTo(models.HelpResponse, {
            onDelete: "CASCADE",
            foreignKey: 'idResponse',
            as: 'response'
        });
        models.Message.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idAuthor',
            as: 'author'
        });
    };

    return Message;
};