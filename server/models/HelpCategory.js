'use strict';
const db = require('../models');

module.exports = (sequelize, DataTypes) => {

    const HelpCategory = sequelize.define('HelpCategory', {
        idParent: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpCategory,
                key: 'id',
                as: 'parent'
            }
        },
        idHelpType: {
            type: DataTypes.INTEGER,
            references: {
                model: db.HelpType,
                key: 'id',
                as: 'type'
            }
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING
    }, {});

    HelpCategory.associate = function(models) {
        models.HelpCategory.hasMany(models.Help, {
            foreignKey: 'idCategory',
            as: 'helps'
        }),
        models.HelpCategory.belongsTo(models.HelpCategory, {
            onDelete: "CASCADE",
            foreignKey: 'idParent',
            as: 'parent'
        }),
        models.HelpCategory.belongsTo(models.HelpType, {
            onDelete: "CASCADE",
            foreignKey: 'idHelpType',
            as: 'type'
        }),
        models.HelpCategory.hasMany(models.HelpCategory, {
            foreignKey: 'idParent',
            as: 'children'
        }),
        models.HelpCategory.belongsToMany(models.User, {
            as: 'users',
            through: 'Categories_Users',
            foreignKey: 'idCategory',
            otherKey: 'idUser',
            onDelete: 'CASCADE'
        })
    };

    return HelpCategory;
};
