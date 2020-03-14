'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define('Notifications', {
        idUser: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
            }
        },
        checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        message: DataTypes.STRING,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Notifications.associate = function(models) {
        models.Notifications.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idUser',
            as: 'user'
        });
    };

    return Notifications;
};
