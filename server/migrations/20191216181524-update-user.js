'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('Users', 'firstname', 'firstname');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('Users', 'firstname', 'firstname');
    }
};