'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('HelpResponses', 'creatorReviewedAt', { type: Sequelize.DATE }),
            queryInterface.addColumn('HelpResponses', 'responderReviewedAt', { type: Sequelize.DATE }),
            queryInterface.addColumn('HelpResponses', 'messageCreator', { type: Sequelize.STRING }),
            queryInterface.addColumn('HelpResponses', 'messageResponder', { type: Sequelize.STRING }),
            queryInterface.addColumn('HelpResponses', 'ratingCreator', { type: Sequelize.INTEGER }),
            queryInterface.addColumn('HelpResponses', 'ratingResponder', { type: Sequelize.INTEGER })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('HelpResponses', 'creatorReviewedAt'),
            queryInterface.removeColumn('HelpResponses', 'responderReviewedAt'),
            queryInterface.removeColumn('HelpResponses', 'messageCreator'),
            queryInterface.removeColumn('HelpResponses', 'messageResponder'),
            queryInterface.removeColumn('HelpResponses', 'ratingCreator'),
            queryInterface.removeColumn('HelpResponses', 'ratingResponder'),
        ])
    }
};
