'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        idReviewer: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
            }
        },
        idReviewed: {
            type: DataTypes.INTEGER,
            references: {
                model: db.User,
                key: 'id',
            }
        },
        createdAt: DataTypes.DATE,
        message: DataTypes.STRING
    }, {});

    Feedback.associate = function(models) {
        models.Feedback.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idReviewer',
            as: 'reviewer'
        });
        models.Feedback.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idReviewed',
            as: 'reviewed'
        });
    };

    return Feedback;
};