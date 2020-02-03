'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'avatar', { type: Sequelize.STRING, allowNull: true })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Users', 'avatar')
    }
};