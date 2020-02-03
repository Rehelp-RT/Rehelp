'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Help', 'id_type', {
                    type: Sequelize.INTEGER
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Help', 'id_type')
    }
};