'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpResponses', 'Message', 'message')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpResponses', 'message', 'Message')
    }
};
