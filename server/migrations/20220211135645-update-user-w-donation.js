'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'donator', {
                    type: Sequelize.BOOLEAN
                }                
        ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Users',
                'donator'
            ),
        ])
    }
};