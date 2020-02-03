'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HelpResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_help: {
        type: Sequelize.INTEGER
      },
      id_responder: {
        type: Sequelize.INTEGER
      },
      id_tradeType: {
        type: Sequelize.INTEGER
      },
      isTutor: {
        type: Sequelize.BOOLEAN
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HelpResponses');
  }
};