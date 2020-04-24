"use strict";
module.exports = (sequelize, DataTypes) => {
    const Categories_Users = sequelize.define(
        "Categories_Users", {
            idCategory: {
                type: DataTypes.INTEGER,
                references: { model: 'Users', key: 'id' }
            },
            idUser: {
                type: DataTypes.INTEGER,
                references: { model: 'HelpCategories', key: 'id' }
            }
        }, {}
    );

    return Categories_Users;
};
