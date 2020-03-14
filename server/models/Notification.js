'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
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

    Notification.associate = function(models) {
        models.Notification.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idUser',
            as: 'user'
        });
    };

    return Notification;
};
