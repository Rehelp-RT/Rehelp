'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        idPost: {
          type: DataTypes.INTEGER,
          references: { model: db.ForumPosts, key: 'id' }
        },
        idHelp: {
            type: DataTypes.INTEGER,
            references: { model: db.Help, key: 'id' }
        },
        idCreator: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        message: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Comments.associate = function(models) {
        models.Comments.belongsTo(models.ForumPosts, {
          onDelete: "CASCADE",
          foreignKey: 'idPost',
          as: 'post'
        });
        models.Comments.belongsTo(models.Help, {
            onDelete: "CASCADE",
            foreignKey: 'idHelp',
            as: 'help'
        });
        models.Comments.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idCreator',
            as: 'author'
        });
    };

    return Comments;
};