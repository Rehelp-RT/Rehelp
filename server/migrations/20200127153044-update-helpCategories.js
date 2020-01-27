'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('HelpCategories', 'title', 'code'),
            queryInterface.addColumn('HelpCategories', 'name', { type: Sequelize.STRING }),
            queryInterface.removeColumn('HelpCategories', 'description'),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('HelpCategories', 'code', 'title'),
            queryInterface.addColumn('HelpCategories', 'description', { type: Sequelize.TEXT }),
            queryInterface.removeColumn('HelpCategories', 'name'),
        ]);
    }
};