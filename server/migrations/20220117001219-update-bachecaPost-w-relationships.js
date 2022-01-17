'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('BachecaPosts', ['idHelp'], {
          type: 'foreign key',
          name: 'custom_fkey_bachecaPost_idHelp',
          references: { table: 'Help', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('BachecaPosts', ['idCreator'], {
          type: 'foreign key',
          name: 'custom_fkey_bachecaPost_author',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('BachecaPosts', ['idResponder'], {
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
