'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('HelpCategories', 'id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: false,
                primaryKey: true
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('HelpCategories', 'id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            })
        ]);
    }
};