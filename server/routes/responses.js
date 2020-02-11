var router = require('express').Router();
const db = require('../models');

// GET /api/responses
router.get('/', (req, res) =>
    db.HelpResponse.findAll({
        attributes: ['id', 'accepted', 'completed'],
        include: [{
                attributes: ['id', 'title'],
                model: db.Help,
                required: true,
                as: 'help'
            },
            {
                attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
                model: db.User,
                required: true,
                as: 'responder'
            }
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

// GET /api/responses/5
router.get('/:id', (req, res) => {
    db.HelpResponse.findByPk(
            req.params.id, {
                include: [{
                        attributes: ['id', 'title'],
                        model: db.Help,
                        required: true,
                        as: 'help'
                    },
                    {
                        attributes: ['username', 'firstname', 'lastname'],
                        model: db.User,
                        required: true,
                        as: 'responder'
                    }
                ]
            })
        .then(x => {
            if (!x) {
                return res.status(404).send({
                    message: 'Response with id ' + req.params.id + ' not found.'
                });
            }
            res.send(x);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Response with id ' + req.params.id + ' not found.'
                });
            }
            return res.status(500).send({
                message: err.message
            });
        });
});

// POST /api/responses/add
router.post('/add', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.idHelp === undefined) {
        res.status(400).send({ message: 'idHelp is missing' });
    } else if (body.idResponder === undefined) {
        res.status(400).send({ message: 'idResponder is missing' });
    } else if (body.message === undefined) {
        res.status(400).send({ message: 'message is missing' });
    } else {

        db.HelpResponse.create({
                accepted: body.accepted,
                completed: body.completed,
                isTutor: body.isTutor,
                idTradeType: body.idTradeType,
                idHelp: body.idHelp,
                idResponder: body.idResponder,
                message: body.message
            })
            .then(x => {
                res.status(201).send({
                    id: x.id
                })
            })
            .catch(err => {
                res.status(500).send(err)
            });
    }
});

// PUT /api/responses/accept/5
router.put('/accept/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.HelpResponse.findByPk(
                req.params.id)
            .then(function(response) {
                // Check if record exists in db
                if (response) {
                    const currentDate = new Date();
                    response.update({
                            accepted: true,
                            acceptedAt: currentDate
                        })
                        .then(x => {
                            res.status(200).send(response)
                        })
                }
            })
    }
});

// PUT /api/responses/cancel/5
router.put('/cancel/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.HelpResponse.findByPk(
                req.params.id)
            .then(function(response) {
                // Check if record exists in db
                if (response) {
                    const currentDate = new Date();
                    response.update({
                            accepted: false,
                            canceledAt: currentDate
                        })
                        .then(x => {
                            res.status(200).send(response)
                        })
                }
            })
    }
});

// PUT /api/responses/complete/5
router.put('/complete/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.HelpResponse.findByPk(req.params.id, {
                include: [{
                        model: db.Help,
                        required: true,
                        as: 'help',
                        include: [{
                            attributes: ['id', 'likehelps'],
                            model: db.User,
                            required: true
                        }]
                    },
                    {
                        attributes: ['id', 'likehelps'],
                        model: db.User,
                        required: true,
                        as: 'responder'
                    }
                ]
            })
            .then(function(response) {
                // Check if record exists in db
                if (response) {
                    const currentDate = new Date();
                    const creatorLh = response.help.creator.likehelps;
                    const responderLh = response.responder.likehelps;

                    response.update({
                            completed: true,
                            completedAt: currentDate
                        })
                        .then(x => {
                            response.help.User.update({
                                    likehelps: creatorLh - 1
                                })
                                .then(y => {
                                    response.responder.update({
                                            likehelps: responderLh + 1
                                        })
                                        .then(y => {
                                            res.status(200).send(response);
                                        })
                                })
                        })

                }
            })
    }
});

// exports
module.exports = router;