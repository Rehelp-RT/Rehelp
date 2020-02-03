"use strict";
module.exports = (sequelize, DataTypes) => {
    const HelpType = sequelize.define(
        "HelpType", {
            code: DataTypes.STRING,
            description: DataTypes.STRING
        }, {}
    );
    HelpType.associate = function(models) {
        models.HelpCategory.hasMany(models.Help, {
            foreignKey: 'id_type',
            as: 'helps'
        });
    };
    return HelpType;
};