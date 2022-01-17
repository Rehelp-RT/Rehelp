'use strict';
const db = require('../models');
// TODO:
module.exports = (sequelize, DataTypes) => {
    const BachecaPosts = sequelize.define('BachecaPosts', {
        idHelp: {
            type: DataTypes.INTEGER,
            references: { model: db.Help, key: 'id' }
        },
        idCreator: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        idResponder: {
            type: DataTypes.INTEGER,
            references: { model: db.User, key: 'id' }
        },
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    BachecaPosts.associate = function(models) {
        models.BachecaPosts.belongsTo(models.Help, {
            onDelete: "CASCADE",
            foreignKey: 'idHelp',
            as: 'help'
        });
        models.BachecaPosts.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idCreator',
            as: 'author'
        });
        models.BachecaPosts.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: 'idResponder',
            as: 'responder'
        });
    };

    return BachecaPosts;
};