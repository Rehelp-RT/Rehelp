'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'HelpResponses',
                'posted', {
                    type: Sequelize.BOOLEAN
                }                
            ),
            queryInterface.addColumn(
                'HelpResponses',
                'postedAt', {
                    type: Sequelize.DATE
                }                
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'HelpResponses',
                'posted'
            ),
            queryInterface.removeColumn(
                'HelpResponses',
                'postedAt'
            ),
        ])
    }
};