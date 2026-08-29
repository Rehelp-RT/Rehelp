'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('ForumPosts', {
        fields: ['idCategory'],
          type: 'foreign key',
          name: 'custom_fkey_forumPost_category',
          references: { table: 'HelpCategories', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('ForumPosts', {
        fields: ['idCreator'],
          type: 'foreign key',
          name: 'custom_fkey_forumPost_author',
          references: { table: 'Users', field: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeConstraint('ForumPosts', 'custom_fkey_forumPost_category'),
        queryInterface.removeConstraint('ForumPosts', 'custom_fkey_forumPost_author')
    ])
  }
};
