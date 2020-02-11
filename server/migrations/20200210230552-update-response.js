'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('HelpResponses', 'acceptedAt', { type: Sequelize.DATE, allowNull: true }),
            queryInterface.addColumn('HelpResponses', 'canceledAt', { type: Sequelize.DATE, allowNull: true }),
            queryInterface.addColumn('HelpResponses', 'completedAt', { type: Sequelize.DATE, allowNull: true })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('HelpResponses', 'acceptedAt'),
            queryInterface.removeColumn('HelpResponses', 'canceledAt'),
            queryInterface.removeColumn('HelpResponses', 'completedAt')
        ]);
    }
};
