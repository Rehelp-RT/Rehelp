'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('HelpResponses', 'id_help', 'idHelp'),
            queryInterface.renameColumn('HelpResponses', 'id_responder', 'idResponder')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('HelpResponses', 'idHelp', 'id_help'),
            queryInterface.renameColumn('HelpResponses', 'idResponder', 'id_responder')
        ]);
    }
};