'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Help', 'title')
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Help', 'title',
      { type: Sequelize.STRING, allowNull: true })
  }
};
