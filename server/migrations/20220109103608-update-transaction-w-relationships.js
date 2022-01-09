'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Transactions', ['idUser'], {
          type: 'foreign key',
          name: 'custom_fkey_transaction_user',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Transactions', ['idHelp'], {
        type: 'foreign key',
        name: 'custom_fkey_transaction_help',
        references: { table: 'Help', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('Transactions', 'custom_fkey_transaction_user'),
        queryInterface.removeConstraint('Transactions', 'custom_fkey_transaction_help'),
    ])
  }
};
