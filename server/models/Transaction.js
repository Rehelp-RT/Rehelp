"use strict";
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        "Transaction", {
            idUser: {
                type: DataTypes.INTEGER,
                references: { model: db.User, key: 'id' }
            },
            idHelp: {
                type: DataTypes.INTEGER,
                references: { model: db.Help, key: 'id' }
            },
            likeHelpNumber: DataTypes.INTEGER,
            isPositive: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }, {}
    );

    Transaction.associate = function(models) {
        models.Transaction.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idUser',
            as: 'user'
        });
        models.Transaction.belongsTo(models.Help, {
            onDelete: "CASCADE",
            foreignKey: 'idHelp',
            as: 'help'
        });
    };

    return Transaction;
};