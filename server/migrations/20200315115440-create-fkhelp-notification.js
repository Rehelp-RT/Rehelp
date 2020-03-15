'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('Notifications', ['idHelp'], {
                type: 'foreign key',
                name: 'custom_fkey_notifications_help',
                references: { table: 'Help', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('Notifications', 'custom_fkey_notifications_help')
        ])
    }
};
