'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Feedbacks', 'rating', { type: Sequelize.INTEGER })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Feedbacks', 'rating')
    }
};
