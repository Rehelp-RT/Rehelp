var router = require('express').Router();
const db = require('../models');

// GET /api/helps
router.get('/', (req, res) =>
    db.Help.findAll({
        attributes: ['id', 'title', 'address', 'createdAt', 'image'],
        include: [{
                attributes: ['code', 'name'],
                model: db.HelpType,
                required: true,
                as: 'type'
            },
            {
                attributes: ['id', 'code', 'name'],
                model: db.HelpCategory,
                include: [{
                    attributes: ['id', 'code', 'name'],
                    model: db.HelpCategory,
                    include: [{
                        attributes: ['id', 'code', 'name'],
                        model: db.HelpCategory,
                        as: 'parent'
                    }],
                    as: 'parent'
                }],
                required: true,
                as: 'category'
            },
            {
                attributes: ['username', 'firstname', 'lastname', 'avatar'],
                model: db.User,
                required: true,
                as: 'creator'
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
);

// GET /api/helps/type/MEH
router.get('/type/:code', (req, res) => {
    db.HelpType.findOne({ where: { code: req.params.code } })
        .then(type => {
            if (type === null) {
                console.log('type is null');
                res.json([]);
            } else {
                console.log(type);
                db.Help.findAll({
                        attributes: ['id', 'title', 'address', 'createdAt', 'image'],
                        where: { idType: type.id },
                        include: [{
                                attributes: ['code', 'name'],
                                model: db.HelpCategory,
                                required: true,
                                as: 'category'
                            },
                            {
                                attributes: ['username', 'firstname', 'lastname', 'avatar'],
                                model: db.User,
                                required: true,
                                as: 'creator'
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
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        });
});

// GET /api/helps/5
router.get('/:id', (req, res) => {
    db.Help.findByPk(req.params.id, {
            include: [
                { attributes: ['code', 'name'], model: db.HelpType, required: true, as: 'type' },
                {
                    attributes: ['id', 'code', 'name'],
                    model: db.HelpCategory,
                    include: [{
                        attributes: ['id', 'code', 'name'],
                        model: db.HelpCategory,
                        include: [{
                            attributes: ['id', 'code', 'name'],
                            model: db.HelpCategory,
                            as: 'parent'
                        }],
                        as: 'parent'
                    }],
                    required: true,
                    as: 'category'
                },
                { attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'], model: db.User, required: true, as: 'creator' },
                {
                    attributes: ['id', 'accepted', 'completed', 'message'],
                    include: [{
                        attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
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
    console.log(body, "body add")
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

        db.Help.create({
                title: body.title,
                description: body.description,
                idType: body.idType,
                idCategory: body.idCategory,
                idCreator: body.idCreator,
                halfhourValidity: body.halfhourValidity,
                dateStartValidity: body.dateStartValidity,
                dateEndValidity: body.dateEndValidity,
                dateCompletion: null,
                image: body.image,
                latitude: body.latitude,
                longitude: body.longitude,
                address: body.address
            })
            .then(help => {
                res.status(201).send({
                    id: help.id
                })
            })
            .catch(err => {
                res.status(500).send(err)
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
            .then(function(help) {
                // Check if record exists in db
                if (help) {
                    help.destroy()
                        .then(x => {
                            res.status(200)
                        })
                }
            })
            .catch(err => {
                res.status(500).send(err)
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
            .then(function(help) {
                // Check if record exists in db
                if (help) {
                    help.update({
                            title: body.title,
                            description: body.description,
                            idCategory: body.idCategory,
                            halfhourValidity: body.halfhourValidity,
                            dateStartValidity: body.dateStartValidity,
                            dateEndValidity: body.dateEndValidity,
                            dateCompletion: null,
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

// exports
module.exports = router;
