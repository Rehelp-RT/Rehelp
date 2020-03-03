'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Feedbacks', 'updatedAt', {
                    type: Sequelize.DATE
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Feedbacks', 'updatedAt')
    }
};