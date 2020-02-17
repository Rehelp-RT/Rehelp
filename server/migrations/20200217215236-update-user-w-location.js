'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Users', 'latitude', { type: Sequelize.FLOAT }),
            queryInterface.addColumn('Users', 'longitude', { type: Sequelize.FLOAT }),
            queryInterface.addColumn('Users', 'address', { type: Sequelize.STRING, allowNull: true })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'latitude'),
            queryInterface.removeColumn('Users', 'longitude'),
            queryInterface.removeColumn('Users', 'address')
        ])
    }
};
