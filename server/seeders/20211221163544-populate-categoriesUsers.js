'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Categories_Users', null, {}),
            queryInterface.bulkInsert('Categories_Users', [
            { idUser: 1, idCategory: 10, createdAt: '2021-11-29 16:07:10.501+01', updatedAt: '2021-11-29 16:07:10.501+01' },
            { idUser: 1, idCategory: 12, createdAt: '2021-11-29 16:07:10.501+01', updatedAt: '2021-11-29 16:07:10.501+01' },
            { idUser: 1, idCategory: 13, createdAt: '2021-11-29 16:07:10.501+01', updatedAt: '2021-11-29 16:07:10.501+01' },
            { idUser: 1, idCategory: 15, createdAt: '2021-11-29 16:07:10.501+01', updatedAt: '2021-11-29 16:07:10.501+01' },
            { idUser: 2, idCategory: 1, createdAt: '2021-12-04 18:20:18.386+01', updatedAt: '2021-12-04 18:20:18.386+01' },
            { idUser: 3, idCategory: 216, createdAt: '2021-12-05 19:47:53.949+01', updatedAt: '2021-12-05 19:47:53.949+01' }
            ], {})
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories_Users', null, {});
    }
};
