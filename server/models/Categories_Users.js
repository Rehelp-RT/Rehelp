"use strict";
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Categories_Users = sequelize.define(
        "Categories_Users", {
            idCategory: {
                type: DataTypes.INTEGER,
                references: { model: db.HelpCategory, key: 'id' }
            },
            idUser: {
                type: DataTypes.INTEGER,
                references: { model: db.User, key: 'id' }
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }, {}
    );

    Categories_Users.associate = function(models) {
        models.Categories_Users.belongsTo(models.HelpCategory, {
            onDelete: "CASCADE",
            foreignKey: 'idCategory',
            as: 'category'
        });
        models.Categories_Users.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idUser',
            as: 'user'
        });
    };

    return Categories_Users;
};
