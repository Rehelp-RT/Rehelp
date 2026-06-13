'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Messages',
            'idResponse', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'HelpResponses',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Messages', 'idResponse');
    }
};
