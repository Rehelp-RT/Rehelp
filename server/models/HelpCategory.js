'use strict';

module.exports = (sequelize, DataTypes) => {

    const HelpCategory = sequelize.define('HelpCategory', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {});

    HelpCategory.associate = function(models) {
        models.HelpCategory.hasMany(models.Help, {
            foreignKey: 'id_category',
            as: 'helps'
        });
    };

    return HelpCategory;
};