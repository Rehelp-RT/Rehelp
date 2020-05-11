var router = require('express').Router();
const db = require('../models');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const accountSid = '***REMOVED-TWILIO-SID***';
const authToken = '***REMOVED-TWILIO-TOKEN***';
const client = require('twilio')(accountSid, authToken);

// GET /api/helps
router.get('/', (req, res) => {

    //mt to km
    const type = req.query.type !== undefined ? req.query.type : undefined;
    const distance = req.query.distance !== undefined ? req.query.distance * 1000 : undefined;
    const latit = req.query.lat !== undefined ? parseFloat(req.query.lat) : undefined;
    const longit = req.query.long !== undefined ? parseFloat(req.query.long) : undefined;

    // get parameters
    console.log('---- query ----');
    console.log('---------------');
    console.log('req.query', req.query);
    console.log('---------------');
    console.log('---------------');
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
        });
    }
    if (req.query.idCreator !== undefined) {
        filters.push({
            idCreator: req.query.idCreator
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
            'title',
            'address',
            'createdAt',
            'dateEndValidity',
            'image',
            'accepted',
            'reviewed',
            'completed'
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
            as: 'category'
        },
        {
            attributes: ['email', 'firstname', 'lastname', 'avatar', 'id'],
            model: db.User,
            required: true,
            as: 'creator'
        },
        {
            include: [{
                attributes: ['id', 'email', 'firstname', 'lastname', 'avatar'],
                model: db.User,
                required: true,
                as: 'responder'
            }],
            model: db.HelpResponse,
            as: 'responses',
            order: [
                [{ model: db.Help.HelpResponse, as: 'responses' }, 'ddd', 'desc']
            ]
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
                attributes: ['id', 'email', 'firstname', 'lastname',
                    'avatar', 'idGoogle', 'idFacebook', 'loginLocal', 'loginGoogle', 'loginFacebook'],
                model: db.User,
                required: true,
                as: 'creator'
            },
            {
                include: [{
                    attributes: ['id', 'email', 'firstname', 'lastname', 'avatar'],
                    model: db.User,
                    required: true,
                    as: 'responder'
                }],
                model: db.HelpResponse,
                as: 'responses',
                order: [
                    [{ model: db.Help.HelpResponse, as: 'responses' }, 'ddd', 'desc']
                ]
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
    } else if (body.title === undefined) {
        res.status(400).send({ message: 'title is missing' });
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
    } else {
        const dateEndValidity =
            body.halfhourValidity === undefined
                ? null
                : moment(new Date()).add(body.halfhourValidity * 30, 'm').toDate();
        db.Help.create({
            title: body.title,
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
            isOffer: body.isOffer
        })
            .then(help => {
                db.HelpType.findByPk(help.idType).then(type => {
                    if (type.code == 'IMH') {
                        db.User.findAll({
                            attributes: [
                                'id',
                                'firstname',
                                'lastname',
                                'phoneNumber'
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
                                for (var y in x) {
                                    const currentDate = new Date();
                                    db.Notification.create({
                                        idUser: x[y].id,
                                        idHelp: help.id,
                                        message: 'Aiuto Immediato! ' + help.description,
                                        createdAt: currentDate
                                    }).then(not => console.log('not', not.id))
                                        .catch(err => console.log('errCreateNotification', err));

                                    if (x[y].phoneNumber != null) {
                                        console.log('+39' + x[y].phoneNumber);
                                        client.messages
                                            .create({
                                                body: help.description + ' https://localhost:4200/helps/' + help.id,
                                                from: '+12513090971',
                                                to: '+39' + x[y].phoneNumber
                                            })
                                            .then(message => console.log('message', message.sid))
                                            .catch(err => console.log('errSendSMS', err));
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(500)
                            });
                    }
                })
                .catch(err => console.log('err',err));
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
                        title: body.title,
                        description: body.description,
                        idCategory: body.idCategory,
                        halfhourValidity: body.halfhourValidity,
                        dateStartValidity: body.dateStartValidity,
                        dateEndValidity: body.dateEndValidity,
                        shareType: body.shareType,
                        image: body.image,
                        latitude: body.latitude,
                        longitude: body.longitude,
                        address: body.address
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
                        body: description + ' https://localhost:4200/helps/' + id,
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
};

// exports
module.exports = router;
