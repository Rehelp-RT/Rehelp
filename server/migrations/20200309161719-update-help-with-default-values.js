'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn(
                'Help',
                'accepted', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            ),
            queryInterface.changeColumn(
                'Help',
                'reviewed', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            ),
            queryInterface.changeColumn(
                'Help',
                'completed', {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            )
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn(
                'Help',
                'accepted', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            ),
            queryInterface.changeColumn(
                'Help',
                'reviewed', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            ),
            queryInterface.changeColumn(
                'Help',
                'completed', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            )
        ])
    }
};
