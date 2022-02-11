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
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Associations',
                'idDonateTo'
            ),
            queryInterface.removeColumn(
                'Associations',
                'likehelps'
            ),
            queryInterface.removeColumn(
                'Associations',
                'lhToDonate'
            ),
        ])
    }
};