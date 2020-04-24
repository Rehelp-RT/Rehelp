'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Categories_Users', 'createdAt', {
                allowNull: false,
                type: Sequelize.DATE
            }),
            queryInterface.addColumn('Categories_Users', 'updatedAt', {
                allowNull: false,
                type: Sequelize.DATE
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Categories_Users', 'createdAt'),
            queryInterface.removeColumn('Categories_Users', 'updatedAt')
        ]);
    }
};