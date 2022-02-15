'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Help', ['idDonateTo'], {
        type: 'foreign key',
        name: 'custom_fkey_help_associations',
        references: { table: 'Associations', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('Help', 'custom_fkey_help_associations')
    ])
  }
};


