'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return Promise.all([
            queryInterface.bulkDelete('TradeTypes', null, {}),
            queryInterface.bulkInsert('TradeTypes', [
            { id: 1, code: 'PRE', createdAt: date, updatedAt: date, name: 'Prestito' },
            { id: 2, code: 'REG', createdAt: date, updatedAt: date, name: 'Regalo' }
            ], {})
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('TradeTypes', null, {});
    }
};

