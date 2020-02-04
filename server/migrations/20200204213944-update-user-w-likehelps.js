'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'likehelps', { type: Sequelize.INTEGER, allowNull: false, defaultValue: 3 })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Users', 'likehelps')
    }
};