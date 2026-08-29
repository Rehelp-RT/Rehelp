'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addConstraint('Messages', {
        fields: ['idResponse'],
            type: 'foreign key',
            name: 'custom_fkey_messages_response',
            references: { table: 'HelpResponses', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('Messages', {
        fields: ['idAuthor'],
            type: 'foreign key',
            name: 'custom_fkey_messages_author',
            references: { table: 'Users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('Messages', 'custom_fkey_messages_response'),
        queryInterface.removeConstraint('Messages', 'custom_fkey_messages_author')
    ])
  }
};
