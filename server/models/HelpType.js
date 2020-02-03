"use strict";
module.exports = (sequelize, DataTypes) => {
    const HelpType = sequelize.define(
        "HelpType", {
            code: DataTypes.STRING,
            name: DataTypes.STRING
        }, {}
    );

    HelpType.associate = function(models) {
        models.HelpType.hasMany(models.Help, {
            foreignKey: 'id_type',
            as: 'helps'
        });
    };

    return HelpType;
};