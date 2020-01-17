'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Help',
                'id_category', {
                    type: Sequelize.INTEGER
                }                
            ),
            queryInterface.removeColumn('Help', 'category'),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Help',
                'id_category'
            ),
            queryInterface.addColumn(
                'Help',
                'category',{
                    type: Sequelize.INTEGER
                }
            )
        ])
    }
};