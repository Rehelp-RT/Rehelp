'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('HelpCategories', ['idHelpType'], {
                type: 'foreign key',
                name: 'custom_fkey_categories_helptype',
                references: { table: 'HelpTypes', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('HelpCategories', 'custom_fkey_categories_helptype')
        ])
    }
};
