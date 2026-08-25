'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Messages',
            'imageUrl', {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Messages', 'imageUrl');
    }
};
