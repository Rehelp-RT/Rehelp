'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return Promise.all([
            queryInterface.bulkDelete('HelpCategories', null, {}),
            queryInterface.bulkInsert('HelpCategories', [
                // Meet & Help Categories
                { id: 1, idHelpType: 1, code: 'JOB', createdAt: date, updatedAt: date, name: 'Aiuto' },
                { id: 2, idHelpType: 1, code: 'TEA', createdAt: date, updatedAt: date, name: 'Insegnamento' },
                { id: 3, idHelpType: 1, code: 'HOB', createdAt: date, updatedAt: date, name: 'Hobby' },
                { id: 4, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'computer' },
                { id: 5, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'piccole riparazioni' },
                { id: 6, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'carpenteria' },
                { id: 7, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'ceramica' },
                { id: 8, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'domestici e bricolage' },
                { id: 9, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'falegnameria' },
                { id: 10, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'meccanica' },
                { id: 11, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'elettrici' },
                { id: 12, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'elettroniche' },
                { id: 13, idHelpType: 1, idParent: 5, createdAt: date, updatedAt: date, name: 'idrauliche' },
                { id: 14, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'raccolta ortaggi/frutta' },
                { id: 15, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'giardinaggio' },
                { id: 16, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'sartoria' },
                { id: 17, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'lavanderia e stiratura' },
                { id: 18, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'cucina' },
                { id: 19, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'pulizie di casa' },
                { id: 20, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'montaggio mobili' },
                { id: 21, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'sgomberi / traslochi' },
                { id: 22, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'vitto e alloggio' },
                { id: 23, idHelpType: 1, idParent: 22, createdAt: date, updatedAt: date, name: 'posto letto' },
                { id: 24, idHelpType: 1, idParent: 22, createdAt: date, updatedAt: date, name: 'pasto in casa' },
                { id: 25, idHelpType: 1, idParent: 22, createdAt: date, updatedAt: date, name: 'pasto da asporto' },
                { id: 26, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'accompagnamento (spesa, dottori, uffici)' },
                { id: 27, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'pratiche burocratiche' },
                { id: 28, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'compagnia ad anziani e disabili' },
                { id: 29, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'baby sitting' },
                { id: 30, idHelpType: 1, idParent: 1, createdAt: date, updatedAt: date, name: 'pet sitting (gatti, cani, etc)' },
                { id: 31, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'attività artistiche' },
                { id: 32, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (batteria e percussioni)' },
                { id: 33, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (chitarra e basso)' },
                { id: 34, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica elettronica' },
                { id: 35, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (strumenti a fiato)' },
                { id: 36, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (pianoforte e strumenti a tasti)' },
                { id: 37, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (violino e archi)' },
                { id: 38, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'musica (altro strumento)' },
                { id: 39, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'canto' },
                { id: 40, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'fotografia' },
                { id: 41, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pittura' },
                { id: 42, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'scultura' },
                { id: 43, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'recitazione' },
                { id: 44, idParent: 31, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 45, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'artigianato' },
                { id: 46, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'sartoria' },
                { id: 47, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'falegnameria' },
                { id: 48, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'giardinaggio' },
                { id: 49, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'orticoltura' },
                { id: 50, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'lavorazione ceramica' },
                { id: 51, idParent: 45, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 52, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'astronomia' },
                { id: 53, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'astrologia' },
                { id: 54, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'attività fisica / sport' },
                { id: 55, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ginnastica' },
                { id: 56, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pilates' },
                { id: 57, idParent: 54, idHelpType: 1, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ballo' },
                { id: 58, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'yoga' },
                { id: 59, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'nuoto' },
                { id: 60, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'tennis' },
                { id: 61, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ping pong' },
                { id: 62, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'nordic walking' },
                { id: 63, idParent: 54, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 64, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'accompagnamento (turistico, svago, passaggiata)' },
                { id: 65, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'carte' },
                { id: 66, idParent: 65, idHelpType: 1, createdAt: date, updatedAt: date, name: 'giochi di carte' },
                { id: 67, idParent: 65, idHelpType: 1, createdAt: date, updatedAt: date, name: 'tarocchi' },
                { id: 68, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'cellulari' },
                { id: 69, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'computer' },
                { id: 70, idParent: 69, idHelpType: 1, createdAt: date, updatedAt: date, name: 'programmi office (word, excel, powerpoint)' },
                { id: 71, idParent: 69, idHelpType: 1, createdAt: date, updatedAt: date, name: 'internet e posta elettronica' },
                { id: 72, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'degustazioni enogastronomiche (vino, rum, salumi, etc)' },
                { id: 73, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'lingue' },
                { id: 74, idParent: 73, idHelpType: 1, createdAt: date, updatedAt: date, name: 'inglese' },
                { id: 75, idParent: 73, idHelpType: 1, createdAt: date, updatedAt: date, name: 'spagnolo' },
                { id: 76, idParent: 73, idHelpType: 1, createdAt: date, updatedAt: date, name: 'tedesco' },
                { id: 77, idParent: 73, idHelpType: 1, createdAt: date, updatedAt: date, name: 'francese' },
                { id: 78, idParent: 73, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 79, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'gioco da tavola' },
                { id: 80, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'produzione alimenti' },
                { id: 81, idParent: 80, idHelpType: 1, createdAt: date, updatedAt: date, name: 'conserve' },
                { id: 82, idParent: 80, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pasta' },
                { id: 83, idParent: 80, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pane' },
                { id: 84, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'produzione bevande' },
                { id: 85, idParent: 84, idHelpType: 1, createdAt: date, updatedAt: date, name: 'analocoliche' },
                { id: 86, idParent: 84, idHelpType: 1, createdAt: date, updatedAt: date, name: 'cocktail' },
                { id: 87, idParent: 84, idHelpType: 1, createdAt: date, updatedAt: date, name: 'birra' },
                { id: 88, idParent: 84, idHelpType: 1, createdAt: date, updatedAt: date, name: 'liquori' },
                { id: 89, idParent: 84, idHelpType: 1, createdAt: date, updatedAt: date, name: 'vino' },
                { id: 90, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'produzione bigiotteria e gioielleria' },
                { id: 91, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'religioni' },
                { id: 92, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'storia' },
                { id: 93, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'storia dell’arte' },
                { id: 94, idParent: 2, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 95, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'collezionismo / modellismo' },
                { id: 96, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'degustazioni enogastronomiche (vino, rum, salumi, etc)' },
                { id: 97, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'gioco da tavola' },
                { id: 98, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'giochi di carte' },
                { id: 99, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'lettura libri / ascolto musica' },
                { id: 100, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'videogiochi' },
                { id: 101, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'attività fisica / sport' },
                { id: 102, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ginnastica' },
                { id: 103, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pilates' },
                { id: 104, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ballo' },
                { id: 105, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'calcio' },
                { id: 106, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'yoga' },
                { id: 107, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'nuoto' },
                { id: 108, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'tennis' },
                { id: 109, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pallacanestro' },
                { id: 110, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pallavolo' },
                { id: 111, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'pesistica' },
                { id: 112, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'ping pong' },
                { id: 113, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'nordic walking' },
                { id: 114, idParent: 101, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },
                { id: 115, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'teatro' },
                { id: 116, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'cinema' },
                { id: 117, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'shopping' },
                { id: 118, idParent: 3, idHelpType: 1, createdAt: date, updatedAt: date, name: 'altro' },

                // Collective Help Categories

                { id: 119, idHelpType: 2, createdAt: date, updatedAt: date, name: 'Costruzione e ristrutturazione' },

                { id: 120, idHelpType: 2, createdAt: date, updatedAt: date, name: 'Piantumazione' },

                { id: 121, idHelpType: 2, createdAt: date, updatedAt: date, name: 'Costruzione e ristrutturazione' },


                // Immediate Help Categories

                { id: 122, idHelpType: 3, createdAt: date, updatedAt: date, name: 'Assistenza stradale' },

                { id: 123, idHelpType: 3, createdAt: date, updatedAt: date, name: 'Fame e sete' },

                { id: 124, idHelpType: 3, createdAt: date, updatedAt: date, name: 'Prestito oggetti' },

                { id: 125, idHelpType: 3, createdAt: date, updatedAt: date, name: 'Primo soccorso' },

                // Meet & Share Categories

                { id: 126, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Abbigliamento e accessori' },

                { id: 127, idHelpType: 4, idParent: 126, createdAt: date, updatedAt: date, name: 'abbigliamento uomo' },
                { id: 128, idHelpType: 4, idParent: 126, createdAt: date, updatedAt: date, name: 'abbigliamento donna' },
                { id: 129, idHelpType: 4, idParent: 126, createdAt: date, updatedAt: date, name: 'abbigliamento bambino/a' },
                { id: 130, idHelpType: 4, idParent: 126, createdAt: date, updatedAt: date, name: 'accessori' },
                { id: 131, idHelpType: 4, idParent: 126, createdAt: date, updatedAt: date, name: 'altro' },

                { id: 132, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Attrezzature sportive' },

                { id: 133, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'arti marziali' },
                { id: 134, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'basket' },
                { id: 135, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'boxe' },
                { id: 136, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'calcio' },
                { id: 137, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'canottaggio e barca' },
                { id: 138, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'ciclismo' },
                { id: 139, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'pallavolo' },
                { id: 140, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'sci e snowboard' },
                { id: 141, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'surf' },
                { id: 142, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'tennis' },
                { id: 143, idHelpType: 4, idParent: 132, createdAt: date, updatedAt: date, name: 'altro' },

                { id: 144, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Casa' },

                { id: 145, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'attrezzi edilizia' },
                { id: 146, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'divano' },
                { id: 147, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'materasso' },
                { id: 148, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'pentole, stoviglie, accessori cucina' },
                { id: 149, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'sedia' },
                { id: 150, idHelpType: 4, idParent: 144, createdAt: date, updatedAt: date, name: 'tavolo' },

                { id: 151, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Cellulari e tablet' },

                { id: 152, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Elettrodomestici' },

                { id: 153, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'aspirapolvere' },
                { id: 154, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'frigo' },
                { id: 155, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'lavatrice' },
                { id: 156, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'quadri' },
                { id: 157, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'stereo' },
                { id: 158, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'TV' },
                { id: 159, idHelpType: 4, idParent: 152, createdAt: date, updatedAt: date, name: 'altro' },

                { id: 160, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Elettronica e computer' },

                { id: 161, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Giochi' },

                { id: 162, idHelpType: 4, idParent: 161, createdAt: date, updatedAt: date, name: 'giochi per bimbi' },
                { id: 163, idHelpType: 4, idParent: 161, createdAt: date, updatedAt: date, name: 'giochi da tavolo' },
                { id: 164, idHelpType: 4, idParent: 161, createdAt: date, updatedAt: date, name: 'videogiochi' },
                { id: 165, idHelpType: 4, idParent: 161, createdAt: date, updatedAt: date, name: 'altro' },

                { id: 166, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Mezzi di trasporto' },

                { id: 167, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'auto' },
                { id: 168, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'bicicletta' },
                { id: 169, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'camion' },
                { id: 170, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'furgone' },
                { id: 171, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'moto' },
                { id: 172, idHelpType: 4, idParent: 166, createdAt: date, updatedAt: date, name: 'altro' },

                { id: 173, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Tempo libero' },

                { id: 174, idHelpType: 4, idParent: 173, createdAt: date, updatedAt: date, name: 'dischi' },
                { id: 175, idHelpType: 4, idParent: 173, createdAt: date, updatedAt: date, name: 'libri' },
                { id: 176, idHelpType: 4, idParent: 173, createdAt: date, updatedAt: date, name: 'strumenti musicali' },

                { id: 177, idHelpType: 4, createdAt: date, updatedAt: date, name: 'Viaggi' },

                { id: 178, idHelpType: 4, idParent: 177, createdAt: date, updatedAt: date, name: 'sacco a pelo' },
                { id: 179, idHelpType: 4, idParent: 177, createdAt: date, updatedAt: date, name: 'tenda' },
                { id: 180, idHelpType: 4, idParent: 177, createdAt: date, updatedAt: date, name: 'valigia' },
                { id: 181, idHelpType: 4, idParent: 177, createdAt: date, updatedAt: date, name: 'zaino' },
                { id: 182, idHelpType: 4, idParent: 177, createdAt: date, updatedAt: date, name: 'altro' },


                // aggiunte immediate help

                { id: 183, idHelpType: 3, idParent: 124, createdAt: date, updatedAt: date, name: 'biglietti inutilizzati' },
                { id: 184, idHelpType: 3, idParent: 124, createdAt: date, updatedAt: date, name: 'posto auto' },
                { id: 185, idHelpType: 3, idParent: 124, createdAt: date, updatedAt: date, name: 'ombrellone' },

            ], {}),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpCategories', null, {});
    }
};
