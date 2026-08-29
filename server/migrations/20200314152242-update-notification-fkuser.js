'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addConstraint('Notifications', {
        fields: ['idUser'],
          type: 'foreign key',
          name: 'custom_fkey_notifications_user',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('Notifications', 'custom_fkey_notifications_user')
    ])
  }
};