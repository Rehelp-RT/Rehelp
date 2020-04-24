'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('Categories_Users', ['idCategory'], {
                type: 'foreign key',
                name: 'custom_fkey_categoriesusers_categories',
                references: { table: 'HelpCategories', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
            queryInterface.addConstraint('Categories_Users', ['idUser'], {
                type: 'foreign key',
                name: 'custom_fkey_categoriesusers_users',
                references: { table: 'Users', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('Categories_Users', 'custom_fkey_categoriesusers_categories'),
            queryInterface.removeConstraint('Categories_Users', 'custom_fkey_categoriesusers_users')
        ])
    }
};
