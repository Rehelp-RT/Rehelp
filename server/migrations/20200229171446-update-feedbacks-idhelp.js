'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Feedbacks', 'idHelp', {
                    type: Sequelize.INTEGER
                }
            ),
            queryInterface.addConstraint('Feedbacks', ['idHelp'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_help',
                references: { table: 'Help', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Feedbacks', 'idHelp'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_help')
        ]);
    }
};
