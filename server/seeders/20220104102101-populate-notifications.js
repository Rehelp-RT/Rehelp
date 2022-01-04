'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Notifications', null, {}),
            queryInterface.bulkInsert('Notifications', [
            { id: 1, idUser: 1, checked: true, createdAt: '2021-11-29 16:10:30.474+01', updatedAt: '2021-11-29 16:12:53.153+01', message: 'Christina ha risposto alla tua richiesta di aiuto', idHelp: 1 },
            { id: 2, idUser: 2, checked: true, createdAt: '2021-11-29 16:12:38.204+01', updatedAt: '2021-11-29 16:13:21.837+01', message: 'ben ha accettato la tua risposta!', idHelp: 1 },
            { id: 3, idUser: null, checked: false, createdAt: '2021-11-29 18:08:06.932+01', updatedAt: '2021-11-29 18:08:06.967+01', message: 'ben ha risposto alla tua richiesta di aiuto!', idHelp: 3 },
            { id: 4, idUser: 2, checked: false, createdAt: '2021-11-29 18:14:20.707+01', updatedAt: '2021-11-29 18:14:20.727+01', message: 'Michael ha risposto alla tua richiesta di aiuto!', idHelp: 3 },
            { id: 5, idUser: 2, checked: false, createdAt: '2021-11-29 18:16:07.711+01', updatedAt: '2021-11-29 18:16:07.746+01', message: 'Michael ha risposto alla tua richiesta di aiuto!', idHelp: 2 },
            { id: 6, idUser: 3, checked: true, createdAt: '2021-11-29 18:17:30.518+01', updatedAt: '2021-11-29 18:17:42.637+01', message: 'Christina ha accettato la tua risposta!', idHelp: 3 },
            { id: 7, idUser: 3, checked: false, createdAt: '2021-11-29 19:54:26.516+01', updatedAt: '2021-11-29 19:54:26.548+01', message: 'Christina ha accettato la tua risposta!', idHelp: 2 },
            { id: 8, idUser: 3, checked: false, createdAt: '2021-12-04 19:10:24.673+01', updatedAt: '2021-12-04 19:10:24.698+01', message: 'Christina ti ha dato una nuova recensione!', idHelp: 3 },
            { id: 9, idUser: 3, checked: false, createdAt: '2021-12-04 19:11:35.776+01', updatedAt: '2021-12-04 19:11:35.811+01', message: 'Christina ti ha dato una nuova recensione!', idHelp: 2 },
            { id: 10, idUser: 3, checked: false, createdAt: '2021-12-04 19:18:15.636+01', updatedAt: '2021-12-04 19:18:15.662+01', message: 'Christina ha risposto alla tua richiesta di aiuto!', idHelp: 4 },
            { id: 11, idUser: 2, checked: false, createdAt: '2021-12-04 19:35:21.294+01', updatedAt: '2021-12-04 19:35:21.336+01', message: 'Michael ha accettato la tua risposta!', idHelp: 4 },
            { id: 12, idUser: 2, checked: false, createdAt: '2021-12-04 19:35:25.842+01', updatedAt: '2021-12-04 19:35:25.862+01', message: 'Michael ha accettato la tua risposta!', idHelp: 4 },
           
            ], {})
        ]);
    },
 
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Notifications', null, {});
    }
};
 

