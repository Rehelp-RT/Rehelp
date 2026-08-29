'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('HelpCategories', 'idParent', { type: Sequelize.INTEGER });
        await queryInterface.addConstraint('HelpCategories', {
            fields: ['idParent'],
            type: 'foreign key',
            name: 'custom_fkey_category_parent',
            references: { table: 'HelpCategories', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('HelpCategories', 'idParent'),
            queryInterface.removeConstraint('HelpCategories', 'custom_fkey_category_parent')
        ]);
    }
};
