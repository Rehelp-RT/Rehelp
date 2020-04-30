'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.addColumn(
            'Users',
            'idFacebook', {
              type: Sequelize.STRING,
              allowNull: true
            }
          ),
          queryInterface.addColumn(
            'Users',
            'idGoogle', {
              type: Sequelize.STRING,
              allowNull: true
            }
          ),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Users',
                'idFacebook', {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            ),
            queryInterface.removeColumn(
                'Users',
                'idGoogle', {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            )
        ])
    }
};
