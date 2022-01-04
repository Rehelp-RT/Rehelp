'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Help', null, {}),
            queryInterface.bulkInsert('Help', [
              { id: 1, description: 'ho bisogno di affittare un appartamento per i mesi di giugno-luglio', createdAt: '2021-11-29 15:53:06.001+01', updatedAt: '2021-12-06 11:54:43.594+01', idCategory: 2, idType: 1, idCreator: 1, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 43.3114194, longitude: 13.7145182, address: 'Via Civitanova, 141, 62012 Civitanova Marche MC, Italia', accepted: true, reviewed: false, completed: false, isOffer: false },
 
              { id: 2, description: 'Ho bisogno del pranzo', createdAt: '2021-11-29 18:06:42.836+01', updatedAt: '2021-12-04 19:39:08.211+01', idCategory: 213, idType: 3, idCreator: 2, halfhourValidity: 2, dateStartValidity: null, dateEndValidity: '2021-11-29 19:06:42.826+01', image: null, latitude: 41.9038793, longitude: 12.3840654, address: 'W93M+HJ Roma RM, Italia', accepted: true, reviewed: true, completed: true, isOffer: false },
 
              { id: 3, description: 'mi fai il prato', createdAt: '2021-11-29 18:08:06.685+01', updatedAt: '2021-12-04 19:10:24.688+01', idCategory: 10, idType: 1, idCreator: 2, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.0671016, longitude: 7.6820982, address: 'Via Roma, 84, 10121 Torino TO, Italia', accepted: true, reviewed: true, completed: false, isOffer: true },
 
              { id: 4, description: 'portare a spasso il cane ogni giorno', createdAt: '2021-11-29 18:13:15.111+01', updatedAt: '2021-12-04 19:37:11.554+01', idCategory: 28, idType: 1, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.0671016, longitude: 7.6820982, address: 'Via Roma, 84, 10121 Torino TO, Italia', accepted: true, reviewed: true, completed: false, isOffer: false },
 
              { id: 5, description: 'aiuto', createdAt: '2021-12-04 19:06:07.003+01', updatedAt: '2021-12-04 19:06:07.003+01', idCategory: 215, idType: 3, idCreator: 2, halfhourValidity: 7, dateStartValidity: null, dateEndValidity: '2021-12-04 22:36:06.998+01', image: null, latitude: 45.45637259999999, longitude: 9.1874672, address: 'Corso Italia, 27, 20122 Milano MI, Italia', accepted: false, reviewed: false, completed: false, isOffer: false },
 
              { id: 6, description: 'voglio imparare a cantare', createdAt: '2021-12-04 20:19:54.404+01', updatedAt: '2021-12-04 20:19:54.404+01', idCategory: 137, idType: 1, idCreator: 2, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.1213955, longitude: 7.7128665, address: 'Stazione Stura, 10156 Torino TO, Italia', accepted: false, reviewed: false, completed: false, isOffer: false },
 
              { id: 7, description: 'Hai un appartamento', createdAt: '2021-12-05 11:57:03.026+01', updatedAt: '2021-12-05 12:05:06.002+01', idCategory: 1, idType: 1, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.4380831, longitude: 12.3181963, address: 'Piazzale Roma, 505, 30135 Venezia VE, Italia', accepted: true, reviewed: false, completed: false, isOffer: true },
 
              { id: 8, description: 'mi dai una carota?', createdAt: '2021-12-05 12:07:45.408+01', updatedAt: '2021-12-05 12:07:45.408+01', idCategory: 10, idType: 1, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 41.9428681, longitude: 12.5864168, address: 'Via Civitanova Marche, 8, 00156 Roma RM, Italia', accepted: false, reviewed: false, completed: false, isOffer: true },
 
              { id: 9, description: 'ho bisogno di un aiuto per mio figlio', createdAt: '2021-12-05 12:22:43.105+01', updatedAt: '2021-12-05 12:22:43.105+01', idCategory: 50, idType: 1, idCreator: 2, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 41.937258, longitude: 12.5853482, address: 'Via Treia, 26, 00156 Roma RM, Italia', accepted: false, reviewed: false, completed: false, isOffer: false },
 
              { id: 10, description: 'ho bisogno di una felpa', createdAt: '2021-12-05 19:44:32.879+01', updatedAt: '2021-12-05 19:44:32.879+01', idCategory: 218, idType: 4, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.9237553, longitude: 10.2551862, address: 'Via Civitanova Marche, 3, 25040 Esine BS, Italia', accepted: false, reviewed: false, completed: false, isOffer: false },
             
              { id: 11, description: 'Mi aiutate a pulire il bosco?', createdAt: '2021-12-05 19:55:11.021+01', updatedAt: '2021-12-05 19:55:11.021+01', idCategory: 202, idType: 2, idCreator: 1, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 43.2998053, longitude: 13.7040456, address: 'Via Silvio Pellico, 28, 62012 Civitanova Marche MC, Italia', accepted: false, reviewed: false, completed: false, isOffer: false },
 
              { id: 12, description: 'chi vuole venire a nuoto?', createdAt: '2021-12-05 19:59:19.861+01', updatedAt: '2021-12-05 20:26:21.31+01', idCategory: 41, idType: 1, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.7761376, longitude: 9.065011199999999, address: 'Via Strada Statale dei Giovi, 14, 22070 Grandate CO, Italia', accepted: true, reviewed: true, completed: true, isOffer: false },
 
              { id: 13, description: 'ho bisogno di una spazzola', createdAt: '2021-12-05 19:59:50.338+01', updatedAt: '2021-12-05 20:28:33.264+01', idCategory: 212, idType: 3, idCreator: 3, halfhourValidity: 1, dateStartValidity: null, dateEndValidity: '2021-12-05 20:29:50.334+01', image: null, latitude: 45.7761376, longitude: 9.065011199999999, address: 'Via Strada Statale dei Giovi, 14, 22070 Grandate CO, Italia', accepted: true, reviewed: true, completed: true, isOffer: false },
 
              { id: 14, description: 'ho bisogno di una carrozzina', createdAt: '2021-12-05 20:00:32.029+01', updatedAt: '2021-12-05 20:29:48.916+01', idCategory: 233, idType: 4, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.7761376, longitude: 9.065011199999999, address: 'Via Strada Statale dei Giovi, 14, 22070 Grandate CO, Italia', accepted: true, reviewed: true, completed: true, isOffer: false },
 
              { id: 15, description: 'mi aiutate a pulire questa strada?', createdAt: '2021-12-05 20:01:00.605+01', updatedAt: '2021-12-05 20:22:12.832+01', idCategory: 207, idType: 2, idCreator: 3, halfhourValidity: null, dateStartValidity: null, dateEndValidity: null, image: null, latitude: 45.7761376, longitude: 9.065011199999999, address: 'Via Strada Statale dei Giovi, 14, 22070 Grandate CO, Italia', accepted: false, reviewed: true, completed: true, isOffer: false },
            ], {})
        ]);
    },
 
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Help', null, {});
    }
};
 

