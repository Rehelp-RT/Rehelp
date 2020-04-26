'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.addColumn(
            'Users',
            'loginLocal', {
              type: Sequelize.BOOLEAN,
              allowNull: true,
              defaultValue: false
            }
          ),
          queryInterface.addColumn(
            'Users',
            'loginFacebook', {
              type: Sequelize.BOOLEAN,
              allowNull: true,
              defaultValue: false
            }
          ),
          queryInterface.addColumn(
            'Users',
            'loginGoogle', {
              type: Sequelize.BOOLEAN,
              allowNull: true,
              defaultValue: false
            }
          ),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Users',
                'loginLocal', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            ),
            queryInterface.removeColumn(
                'Users',
                'loginFacebook', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            ),
            queryInterface.removeColumn(
                'Users',
                'loginGoogle', {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            )
        ])
    }
};
