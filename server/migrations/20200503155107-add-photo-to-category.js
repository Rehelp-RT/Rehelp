'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('HelpCategories', 'image', { type: Sequelize.STRING });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('HelpCategories', 'image')
    }
};
