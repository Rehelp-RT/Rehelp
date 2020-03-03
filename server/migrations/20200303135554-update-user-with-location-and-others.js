'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Users', 'address', 'city'),
            queryInterface.addColumn('Users', 'country', { type: Sequelize.STRING }),
            queryInterface.addColumn('Users', 'email', { type: Sequelize.STRING })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Users', 'city', 'address'),
            queryInterface.removeColumn('Users', 'country'),
            queryInterface.removeColumn('Users', 'email')
        ])
    }
};