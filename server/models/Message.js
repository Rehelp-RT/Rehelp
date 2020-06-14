'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        idHelp: {
            type: DataTypes.INTEGER,
            references: { model: db.Help, key: 'id' }
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
    };

    return Message;
};