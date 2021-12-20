'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const ForumPosts = sequelize.define('ForumPosts', {
        idCategory: {
            type: DataTypes.INTEGER,
            references: { model: db.HelpCategory, key: 'id' }
        },
        idCreator: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    ForumPosts.associate = function(models) {
        models.ForumPosts.belongsTo(models.HelpCategory, {
            onDelete: "CASCADE",
            foreignKey: 'idCategory',
            as: 'category'
        });
        models.ForumPosts.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idCreator',
            as: 'author'
        });
    };

    return ForumPosts;
};