'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('HelpResponses', 'feedback', 
      { type: Sequelize.STRING, allowNull: true })
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('HelpResponses', 'feedback')
  }
};
