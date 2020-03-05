'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('HelpResponses', 'reviewed', { type: Sequelize.BOOLEAN });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('HelpResponses', 'reviewed');
    }
};
