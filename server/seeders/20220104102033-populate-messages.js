'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Messages', null, {}),
            queryInterface.bulkInsert('Messages', [
            { id: 1, idAuthor: 2, body: 'ciao', createdAt: '2021-12-04 19:12:05.212+01', updatedAt: '2021-12-04 19:12:05.212+01', idHelp: 3 },
            { id: 2, idAuthor: 2, body: 'hola', createdAt: '2021-12-04 19:12:31.246+01', updatedAt: '2021-12-04 19:12:31.247+01', idHelp: 2 },
            { id: 3, idAuthor: 1, body: 'ciao', createdAt: '2021-12-05 19:21:07.398+01', updatedAt: '2021-12-05 19:21:07.402+01', idHelp: 1 },
            { id: 4, idAuthor: 2, body: 'salve', createdAt: '2021-12-05 19:24:38.998+01', updatedAt: '2021-12-05 19:24:38.999+01', idHelp: 1 },
            { id: 5, idAuthor: 3, body: 'va bene domani alle 3', createdAt: '2021-12-05 20:14:45.289+01', updatedAt: '2021-12-05 20:14:45.289+01', idHelp: 12 },
            { id: 6, idAuthor: 2, body: 'non posso scusami', createdAt: '2021-12-05 20:15:55.101+01', updatedAt: '2021-12-05 20:15:55.101+01', idHelp: 12 },
            { id: 7, idAuthor: 3, body: 'uff', createdAt: '2021-12-05 20:16:21.97+01', updatedAt: '2021-12-05 20:16:21.97+01', idHelp: 12 },
            { id: 8, idAuthor: 3, body: 'te ben puoi venire?', createdAt: '2021-12-05 20:16:44.28+01', updatedAt: '2021-12-05 20:16:44.28+01', idHelp: 12 },
            ], {})
        ]);
    },
 
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Messages', null, {});
    }
};
 

