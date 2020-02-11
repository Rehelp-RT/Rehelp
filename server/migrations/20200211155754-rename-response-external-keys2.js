'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpResponses', 'id_tradeType', 'idTradeType')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('HelpResponses', 'idTradeType', 'id_tradeType')
    }
};