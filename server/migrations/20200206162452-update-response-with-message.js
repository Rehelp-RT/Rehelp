'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('HelpResponses', 'Message', { type: Sequelize.TEXT, allowNull: true })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('HelpResponses', 'Message')
    }
};
