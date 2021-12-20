'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      idPost: { type: Sequelize.INTEGER },
      idHelp: { type: Sequelize.INTEGER },
      idCreator: { allowNull: false, type: Sequelize.INTEGER },
      message: { allowNull: false, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};