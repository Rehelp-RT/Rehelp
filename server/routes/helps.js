var router = require('express').Router();
const db = require('../models');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = (accountSid && authToken) ? require('twilio')(accountSid, authToken) : null;

// GET /api/helps
router.get('/', (req, res) => {

    //mt to km
    const type = req.query.type !== undefined ? req.query.type : undefined;
    const distance = req.query.distance !== undefined ? req.query.distance * 1000 : undefined;
    const latit = req.query.lat !== undefined ? parseFloat(req.query.lat) : undefined;
    const longit = req.query.long !== undefined ? parseFloat(req.query.long) : undefined;

    // get parameters
    const filterType = type === undefined ? {} : { code: type };
    var filters = [];
    if (req.query.excludeUserId !== undefined) {
        filters.push({
            [Op.not]: { idCreator: req.query.excludeUserId }
        });
    }
    if (req.query.accepted !== undefined) {
        filters.push({
            accepted: req.query.accepted
        });filters.push({
            reviewed: false
        });
    }
    if (req.query.idCreator !== undefined) {
        filters.push({
            idCreator: req.query.idCreator
        });
    }
    if (req.query.completed !== undefined) {
        filters.push({
            completed: req.query.completed
        });
    }
    if (req.query.posted !== undefined) {
        filters.push({
            posted: req.query.posted
        });
    }
    if (distance !== undefined && longit !== undefined && latit !== undefined) {
        filters.push({
            [Op.and]: [
                Sequelize.fn(
                    //https://postgis.net/docs/ST_DWithin.html
                    'ST_DWithin',
                    // https://postgis.net/docs/ST_MakePoint.html
                    Sequelize.fn('ST_MakePoint', Sequelize.col('Help.longitude'), Sequelize.col('Help.latitude')),
                    Sequelize.fn('ST_MakePoint', longit, latit),
                    distance,
                    true
                )
            ]
        });
    }

    // query
    db.Help.findAll({
        attributes: [
            'id',
            'description',
            'address',
            'latitude',
            'longitude',
            'createdAt',
            'dateEndValidity',
            'image',
            'accepted',
            'reviewed',
            'completed',
            'updatedAt',
            'likehelps',
            'lhToDonate',
            'posted'
        ],
        where: {
            [Op.and]: filters
        },
        include: [{
            attributes: ['code', 'name'],
            model: db.HelpType,
            where: filterType,
            required: true,
            as: 'type'
        },
        {
            attributes: ['id', 'code', 'name', 'image'],
            model: db.HelpCategory,
            include: [{
                attributes: ['id', 'code', 'name', 'image'],
                model: db.HelpCategory,
                include: [{
                    attributes: ['id', 'code', 'name', 'image'],
                    model: db.HelpCategory,
                    as: 'parent'
                }],
                as: 'parent'
            }],
            required: true,
            where: req.query.idCategory !== undefined ? { [Op.and]: { id: req.query.idCategory } }
                : { [Op.not]: { id: null } },
            as: 'category'
        },
        {
            attributes: ['email', 'firstname', 'lastname', 'avatar', 'id', 'cf', 'donator',],
            model: db.User,
            required: true,
            as: 'creator'
        },
        {
            include: [{
                attributes: ['id', 'email', 'firstname', 'lastname', 'avatar', 'cf', 'donator',],
                model: db.User,
                required: true,
                as: 'responder'
            }],
            model: db.HelpResponse,
            as: 'responses',
            order: [
                [{ model: db.Help.HelpResponse, as: 'responses' }, 'ddd', 'desc']
            ]
        },
        {
            attributes: ['name', 'secretId'],
            model: db.Associations,
            required: false,
            as: 'association'
        }
        ],
        order: [
            ['id', 'desc']
        ]
    })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});

// GET /api/helps/5
router.get('/:id', (req, res) => {
    db.Help.findByPk(req.params.id, {
        include: [
            { attributes: ['code', 'name'], model: db.HelpType, required: true, as: 'type' },
            {
                attributes: ['id', 'code', 'name', 'image'],
                model: db.HelpCategory,
                include: [{
                    attributes: ['id', 'code', 'name', 'image'],
                    model: db.HelpCategory,
                    include: [{
                        attributes: ['id', 'code', 'name', 'image'],
                        model: db.HelpCategory,
                        as: 'parent'
                    }],
                    as: 'parent'
                }],
                required: true,
                as: 'category'
            },
            {
                attributes: [
                    'id', 'avatar', 'birthdate', 'city', 'country', 'cf', 'donator',
                    'email', 'firstname', 'lastname', 'latitude', 'longitude',
                    'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                    'idFacebook', 'idGoogle', 'phoneNumber'
                ],
                model: db.User,
                required: true,
                as: 'creator'
            },
            {
                include: [
                    {
                        attributes: [
                            'id', 'avatar', 'birthdate', 'city', 'country', 'cf', 'donator',
                            'email', 'firstname', 'lastname', 'latitude', 'longitude',
                            'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                            'idFacebook', 'idGoogle', 'phoneNumber'
                        ],
                        model: db.User,
                        required: true,
                        as: 'responder'
                    },
                    {
                        attributes: ['id', 'code', 'name'],
                        model: db.TradeType,
                        required: false,
                        as: 'trade'
                    }
                ],
                model: db.HelpResponse,
                as: 'responses',
                order: [
                    [{ model: db.Help.HelpResponse, as: 'responses' }, 'ddd', 'desc']
                ]
            },
            {
                attributes: ['name', 'secretId'],
                model: db.Associations,
                required: false,
                as: 'association'
            }
        ]
    })
        .then(x => {
            if (!x) {
                return res.status(404).send({
                    message: 'Help with id ' + req.params.id + ' not found.'
                });
            }
            res.send(x);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Help with id ' + req.params.id + ' not found.'
                });
            }
            return res.status(500).send({
                message: err.message,
                stacktrace: err.stacktrace
            });
        });
});

// POST /api/helps/add
router.post('/add', (req, res) => {
    const body = req.body;
    console.log('---- body ----')
    console.log('--------------')
    console.log(body)
    console.log('--------------')
    console.log('--------------')
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.description === undefined) {
        res.status(400).send({ message: 'description is missing' });
    } else if (body.idCategory === undefined) {
        res.status(400).send({ message: 'idCategory is missing' });
    } else if (body.idType === undefined) {
        res.status(400).send({ message: 'idType is missing' });
    } else if (body.idCreator === undefined) {
        res.status(400).send({ message: 'idCreator is missing' });
    } else if (body.latitude === undefined) {
        res.status(400).send({ message: 'latitude is missing' });
    } else if (body.longitude === undefined) {
        res.status(400).send({ message: 'longitude is missing' });
    }else if (body.likehelps === undefined) {
        res.status(400).send({ message: 'likehelps are missing' });
    } else {
        const dateEndValidity =
            body.halfhourValidity === undefined
                ? null
                : moment(new Date()).add(body.halfhourValidity * 30, 'm').toDate();
        db.Help.create({
            description: body.description,
            idType: body.idType,
            idCategory: body.idCategory,
            idCreator: body.idCreator,
            halfhourValidity: body.halfhourValidity,
            dateStartValidity: body.dateStartValidity,
            dateEndValidity: dateEndValidity,
            shareType: body.shareType,
            accepted: false,
            reviewed: false,
            completed: false,
            image: body.image,
            latitude: body.latitude,
            longitude: body.longitude,
            address: body.address,
            isOffer: body.isOffer,
            likehelps: body.likehelps,
            lhToDonate: body.lhToDonate,
            idDonateTo: body.idDonateTo
        })
            .then(help => {
                db.HelpType.findByPk(help.idType).then(type => {
                    if (type.code == 'IMH') {
                        db.User.findAll({
                            attributes: [
                                'id',
                                'firstname',
                                'lastname',
                                'phoneNumber',
                                'cf', 'donator',
                            ],
                            where: {
                                [Op.and]: Sequelize.fn(
                                    //https://postgis.net/docs/ST_DWithin.html
                                    'ST_DWithin',
                                    // https://postgis.net/docs/ST_MakePoint.html
                                    Sequelize.fn('ST_MakePoint', Sequelize.col('User.longitude'), Sequelize.col('User.latitude')),
                                    Sequelize.fn('ST_MakePoint', help.longitude, help.latitude),
                                    25000,
                                    true
                                ),
                                [Op.not]: { id: help.idCreator }
                            }
                        })
                            .then(x => {
                                db.User.findByPk(help.idCreator).then(user => {
                                    for (var y in x) {
                                        const currentDate = new Date();
                                        db.Notification.create({
                                            idUser: x[y].id,
                                            idHelp: help.id,
                                            message: user.firstname + ' ha bisogno di un Aiuto Immediato!',
                                            createdAt: currentDate
                                        })
                                            .catch(err => console.log('errCreateNotification', err));
                                        if (x[y].phoneNumber != null) {
                                            var numberToSend = x[y].phoneNumber.substring(0, 3) == '+39' ?
                                                x[y].phoneNumber : '+39' + x[y].phoneNumber
                                            console.log('numberToSend', numberToSend);
                                            if (client) {
                                                client.messages
                                                    .create({
                                                        body: help.description + ' https://rehelp.it/helps/' + help.id,
                                                        from: '+12513090971',
                                                        to: numberToSend
                                                    })
                                                    .then(message => console.log('message', message.sid))
                                                    .catch(err => console.log('errSendSMS', err));
                                            }
                                        }
                                    }
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(500)
                            });
                    }
                })
                    .catch(err => console.log('err', err));
                res.status(201).send({
                    id: help.id
                })
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err.message)
            });
    }
});

// DELETE /api/helps/delete/id
router.delete('/delete/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.Help.findByPk(req.params.id)
            .then(function (help) {
                // Check if record exists in db
                if (help) {
                    help.destroy()
                        .then(x => {
                            res.status(200).send(x);
                        })
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });

    }
});

// PUT /api/helps/update/id
router.put('/update/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.Help.findByPk(req.params.id)
            .then(function (help) {
                // Check if record exists in db
                if (help) {
                    help.update({
                        description: body.description,
                        idCategory: body.idCategory,
                        halfhourValidity: body.halfhourValidity,
                        dateStartValidity: body.dateStartValidity,
                        dateEndValidity: body.dateEndValidity,
                        shareType: body.shareType,
                        image: body.image,
                        latitude: body.latitude,
                        longitude: body.longitude,
                        address: body.address,
                        likehelps: body.likehelps,
                        lhToDonate: body.lhToDonate,
                        idDonateTo: body.idDonateTo
                    })
                        .then(x => {
                            res.status(200).send(help)
                        })
                }
            })
    }
});

function sendSms(distance, long, lat, description, id) {
    var filters = [];
    if (distance !== undefined && long !== undefined && lat !== undefined) {
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
    db.User.findAll({
        attributes: [
            'id',
            'firstname',
            'lastname',
            'phoneNumber',
            'cf', 'donator',
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
                if (client) {
                    client.messages
                        .create({
                            body: description + ' https://localhost:4200/helps/' + id,
                            from: '+12513090971',
                            to: '+39' + x[y].phoneNumber
                        })
                        .then(message => console.log(message.sid));
                }
            }
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        });
};

// exports
module.exports = router;
