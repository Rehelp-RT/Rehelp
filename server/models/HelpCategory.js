'use strict';

module.exports = (sequelize, DataTypes) => {

    const HelpCategory = sequelize.define('HelpCategory', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {});

    HelpCategory.associate = function(models) {
        models.HelpCategory.hasMany(models.Help, {
            foreignKey: 'idCategory',
            as: 'helps'
        });
    };

    return HelpCategory;
};