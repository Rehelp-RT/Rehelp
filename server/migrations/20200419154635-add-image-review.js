'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('HelpResponses', 'imageReviewCreator', { type: Sequelize.STRING }),
            queryInterface.addColumn('HelpResponses', 'imageReviewResponder', { type: Sequelize.STRING })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('HelpResponses', 'imageReviewCreator'),
            queryInterface.removeColumn('HelpResponses', 'imageReviewResponder')
        ]);
    }
};