'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('HelpCategories', 'idHelpType', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('HelpCategories', 'idHelpType', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ]);
    }
};
