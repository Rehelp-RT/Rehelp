'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpTypes', 'description', 'name')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpTypes', 'name', 'description')
    }
};