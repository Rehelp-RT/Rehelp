'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Help', {
        fields: ['id_category'],
        type: 'foreign key',
        name: 'custom_fkey_help_helpCategories',
        references: { table: 'HelpCategories', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Help', 'custom_fkey_help_helpCategories')
  }
};


