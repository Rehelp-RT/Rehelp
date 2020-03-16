'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn(
                'Notifications',
                'updatedAt', {
                    type: Sequelize.DATE,
                    allowNull: true
                }
            )
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn(
                'Notifications',
                'updatedAt', {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            )
        ])
    }
};
