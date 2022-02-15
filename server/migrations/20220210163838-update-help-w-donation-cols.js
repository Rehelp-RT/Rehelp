'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Help',
                'idDonateTo', {
                    type: Sequelize.INTEGER
                }                
            ),
            queryInterface.addColumn(
                'Help',
                'likehelps', {
                    type: Sequelize.INTEGER
                }                
            ),
            queryInterface.addColumn(
                'Help',
                'lhToDonate', {
                    type: Sequelize.INTEGER
                }                
            ),
            queryInterface.addColumn(
                'Help',
                'posted', {
                    type: Sequelize.BOOLEAN
                }                
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Help',
                'idDonateTo'
            ),
            queryInterface.removeColumn(
                'Help',
                'likehelps'
            ),
            queryInterface.removeColumn(
                'Help',
                'lhToDonate'
            ),
            queryInterface.removeColumn(
                'Help',
                'posted'
            ),
        ])
    }
};