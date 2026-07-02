'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Comments', 'idBachecaPost', {
            type: Sequelize.INTEGER,
            allowNull: true
        });
        await queryInterface.addConstraint('Comments', {
            fields: ['idBachecaPost'],
            type: 'foreign key',
            name: 'custom_fkey_comments_bachecapost',
            references: { table: 'BachecaPosts', field: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Comments', 'custom_fkey_comments_bachecapost');
        await queryInterface.removeColumn('Comments', 'idBachecaPost');
    }
};
