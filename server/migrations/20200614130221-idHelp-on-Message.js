'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Messages',
            'idHelp', {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Messages', 'idHelp')
    }
};
