'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Feedbacks', 'rating', 'ratingCreator'),
            queryInterface.addColumn('Feedbacks', 'ratingResponder', { type: Sequelize.INTEGER })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Feedbacks', 'ratingCreator', 'rating'),
            queryInterface.removeColumn('Feedbacks', 'ratingResponder')
        ])
    }
};