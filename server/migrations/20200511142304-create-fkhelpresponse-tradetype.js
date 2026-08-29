'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('HelpResponses', {
        fields: ['idTradeType'],
                type: 'foreign key',
                name: 'custom_fkey_responses_tradetype',
                references: { table: 'TradeTypes', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('HelpResponses', 'custom_fkey_responses_tradetype')
        ])
    }
};
