'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Help', 'image', { type: Sequelize.STRING, allowNull: true })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Help', 'image')
    }
};