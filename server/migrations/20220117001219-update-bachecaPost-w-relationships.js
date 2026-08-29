'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('BachecaPosts', {
        fields: ['idHelp'],
          type: 'foreign key',
          name: 'custom_fkey_bachecaPost_idHelp',
          references: { table: 'Help', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('BachecaPosts', {
        fields: ['idCreator'],
          type: 'foreign key',
          name: 'custom_fkey_bachecaPost_author',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('BachecaPosts', {
        fields: ['idResponder'],
        type: 'foreign key',
        name: 'custom_fkey_bachecaPost_responder',
        references: { table: 'Users', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('BachecaPosts', 'custom_fkey_bachecaPost_idHelp'),
        queryInterface.removeConstraint('BachecaPosts', 'custom_fkey_bachecaPost_author'),
        queryInterface.removeConstraint('BachecaPosts', 'custom_fkey_bachecaPost_responder')
    ])
  }
};
