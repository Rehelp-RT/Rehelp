'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Messages', 'idResponse')
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Messages',
            'idResponse', {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        )
    }
};
