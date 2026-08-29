'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('Help', {
        fields: ['id_type'],
                type: 'foreign key',
                name: 'custom_fkey_help_helpTypes',
                references: { table: 'HelpTypes', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Help', 'custom_fkey_help_helpTypes')
    }
};