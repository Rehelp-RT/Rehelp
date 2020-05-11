"use strict";
module.exports = (sequelize, DataTypes) => {
    const TradeType = sequelize.define(
        "TradeType", {
            code: DataTypes.STRING,
            name: DataTypes.STRING
        }, {}
    );

    TradeType.associate = function(models) {
      models.User.hasMany(models.HelpResponse, {
        foreignKey: 'idTradeType',
        as: 'helpresponses'
      })
    };

    return TradeType;
};
