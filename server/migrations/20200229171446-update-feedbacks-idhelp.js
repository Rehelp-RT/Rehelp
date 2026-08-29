'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Feedbacks', 'idHelp', {
            type: Sequelize.INTEGER
        });
        await queryInterface.addConstraint('Feedbacks', {
            fields: ['idHelp'],
            type: 'foreign key',
            name: 'custom_fkey_feedbacks_help',
            references: { table: 'Help', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Feedbacks', 'idHelp'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_help')
        ]);
    }
};
