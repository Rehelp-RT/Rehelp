'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Feedback', 'idReviewer'),
            queryInterface.removeColumn('Feedback', 'idReviewed'),
            queryInterface.removeConstraint('Feedback', 'custom_fkey_feedbacks_reviewer'),
            queryInterface.removeConstraint('Feedback', 'custom_fkey_feedbacks_reviewed'),
            queryInterface.renameColumn('Feedback', 'message', 'messageCreator'),
            queryInterface.addColumn('Feedback', 'messageResponder', { type: Sequelize.STRING }),
            queryInterface.addColumn('Users', 'email', { type: Sequelize.STRING })
        ])
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};