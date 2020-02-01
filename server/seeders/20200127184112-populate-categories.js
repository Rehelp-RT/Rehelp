'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return queryInterface.bulkInsert('HelpCategories', [
            { code: 'BAB', createdAt: date, updatedAt: date, name: 'Baby sitting e dog sitting' },
            { code: 'BES', createdAt: date, updatedAt: date, name: 'Bestiame' },
            { code: 'CON', createdAt: date, updatedAt: date, name: 'Condivisione della conoscenza' },
            { code: 'CUC', createdAt: date, updatedAt: date, name: 'Cucina' },
            { code: 'AGR', createdAt: date, updatedAt: date, name: 'Lavori agricoli' },
            { code: 'DOM', createdAt: date, updatedAt: date, name: 'Lavori domestici' },
            { code: 'GDT', createdAt: date, updatedAt: date, name: 'Carte, giochi da tavolo e videogiochi' },
            { code: 'HOB', createdAt: date, updatedAt: date, name: 'Hobbistica' },
            { code: 'INF', createdAt: date, updatedAt: date, name: 'Informatica ed elettronica' },
            { code: 'MUS', createdAt: date, updatedAt: date, name: 'Musica e canto' },
            { code: 'SOS', createdAt: date, updatedAt: date, name: 'Sostegno alla persona' },
            { code: 'SPO', createdAt: date, updatedAt: date, name: 'Sport' },
            { code: 'TRA', createdAt: date, updatedAt: date, name: 'Traslochi' },
            { code: 'VIA', createdAt: date, updatedAt: date, name: 'Mezzi di trasporto e viaggi' },
            { code: 'VIT', createdAt: date, updatedAt: date, name: 'Vitto e alloggio' }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpCategories', null, {});
    }
};