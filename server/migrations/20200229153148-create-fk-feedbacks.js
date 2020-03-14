'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint('Feedbacks', ['idReviewer'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_reviewer',
                references: { table: 'Users', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
            queryInterface.addConstraint('Feedbacks', ['idReviewed'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_reviewed',
                references: { table: 'Users', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_reviewer'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_reviewed')
        ])
    }
};
