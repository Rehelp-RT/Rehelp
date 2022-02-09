'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'username', {
                    type: Sequelize.STRING
                }
            ),
            queryInterface.addColumn(
                'Users',
                'password', {
                    type: Sequelize.STRING
                }
            ),
            queryInterface.addColumn(
                'Users',
                'cf', {
                    type: Sequelize.STRING
                }
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'username'),
            queryInterface.removeColumn('Users', 'password'),
            queryInterface.removeColumn('Users', 'cf')
        ]);
    }
};