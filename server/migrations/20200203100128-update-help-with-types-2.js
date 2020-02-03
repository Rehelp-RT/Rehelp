'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'Help', ['id_type'], {
                type: 'foreign key',
                name: 'custom_fkey_help_helpTypes',
                references: { table: 'HelpTypes', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Help', 'id_type')
    }
};