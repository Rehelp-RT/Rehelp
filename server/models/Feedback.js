'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        idResponse: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpResponse,
                key: 'id',
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        messageCreator: DataTypes.STRING,
        messageResponder: DataTypes.STRING,
        ratingCreator: DataTypes.INTEGER,
        ratingResponder: DataTypes.INTEGER
    }, {});

    Feedback.associate = function(models) {
        models.Feedback.belongsTo(models.HelpResponse, {
            onDelete: "CASCADE",
            foreignKey: 'idResponse',
            as: 'response'
        });
    };

    return Feedback;
};