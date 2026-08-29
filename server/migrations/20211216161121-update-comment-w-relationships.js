'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Comments', {
        fields: ['idPost'],
          type: 'foreign key',
          name: 'custom_fkey_comments_post',
          references: { table: 'ForumPosts', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Comments', {
        fields: ['idHelp'],
        type: 'foreign key',
        name: 'custom_fkey_comments_help',
        references: { table: 'Help', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Comments', {
        fields: ['idCreator'],
          type: 'foreign key',
          name: 'custom_fkey_comments_author',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('Comments', 'custom_fkey_comments_post'),
        queryInterface.removeConstraint('Comments', 'custom_fkey_comments_help'),
        queryInterface.removeConstraint('Comments', 'custom_fkey_comments_author')
    ])
  }
};
