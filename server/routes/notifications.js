var router = require('express').Router();
const db = require('../models');
const { Op, Sequelize } = require("sequelize");
const accountSid = '***REMOVED-TWILIO-SID***';
const authToken = '***REMOVED-TWILIO-TOKEN***';
const client = require('twilio')(accountSid, authToken);

// GET /api/notifications
router.get('/', (req, res) =>
    db.Notification.findAll({
        attributes: ['id', 'message', 'checked', 'createdAt'],
        include: [{
            attributes: ['id', 'title'],
            model: db.Help,
            as: 'help'
        },
        {
            attributes: ['id', 'firstname', 'lastname', 'email'],
            model: db.User,
            as: 'user'
        }
        ]
    })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500)
        })
);

// GET /api/notifications/user/:id
router.get('/user/:id', (req, res) => {
    var filter = {
        [Op.and]: [{ idUser: req.params.id },
        { checked: false },
        ],
    };

    db.Notification.findAll({
        where: filter,
        order: [
            ['createdAt', 'desc']
        ]
    })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500)
        })
});

// PUT /api/notifications/check/5
router.put('/check/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.Notification.findByPk(req.params.id)
            .then((notification) => {
                const currentDate = new Date();
                notification.update({
                    checked: true,
                    updatedAt: currentDate
                })
                    .then(x => {
                        res.status(200).send(x)
                    })
            })
    }
});

// GET /api/notifications/sms
router.get('/sms', (req, res) => {
    //mt to km
    var distance = req.query.distance !== undefined ? req.query.distance * 1000 : undefined;
    var latit = req.query.lat !== undefined ? parseFloat(req.query.lat) : undefined;
    var longit = req.query.long !== undefined ? parseFloat(req.query.long) : undefined;
    var filters = [];
    if (distance !== undefined && longit !== undefined && latit !== undefined) {
        filters.push({
            [Op.and]: [
                Sequelize.fn(
                    //https://postgis.net/docs/ST_DWithin.html
                    'ST_DWithin',
                    // https://postgis.net/docs/ST_MakePoint.html
                    Sequelize.fn('ST_MakePoint', Sequelize.col('User.longitude'), Sequelize.col('User.latitude')),
                    Sequelize.fn('ST_MakePoint', longit, latit),
                    distance,
                    true
                )
            ]
        });
    }
    console.log('filters', filters);

    db.User.findAll({
        attributes: [
            'id',
            'firstname',
            'lastname',
            'phoneNumber'
        ],
        where: {
            [Op.and]: filters,
            phoneNumber: {
                [Op.ne]: null
            }
        }
    })
        .then(x => {
            for (var y in x) {
                console.log('+39' + x[y].phoneNumber);
                client.messages
                    .create({
                        body: 'Sms inviato da Rehelp-web',
                        from: '+12513090971',
                        to: '+39' + x[y].phoneNumber
                    })
                    .then(message => console.log(message.sid));
            }
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        });
})

// exports
module.exports = router;
