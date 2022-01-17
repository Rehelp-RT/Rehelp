'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BachecaPosts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      idHelp: { allowNull: false, type: Sequelize.INTEGER },
      idCreator: { allowNull: false, type: Sequelize.INTEGER },
      idResponder: { allowNull: false, type: Sequelize.INTEGER },
      image: { type: Sequelize.STRING },
      description: { allowNull: false, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BachecaPosts');
  }
};
