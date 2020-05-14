var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/responses
router.get('/', (req, res) => {

    // get parameters
    console.log('req.query', req.query);
    var filters = [];
    if (req.query.idResponder !== undefined) {
        filters.push({
            idResponder: req.query.idResponder
        });
    } else if (req.query.accepted !== undefined) {
        filters.push({
            accepted: req.query.accepted
        });
    }
    console.log('filters', filters);

    db.HelpResponse.findAll({
        attributes: ['id', 'accepted', 'completed'],
        where: {
            [Op.and]: filters
        },
        include: [{
            attributes: ['id', 'title', 'image'],
            model: db.Help,
            required: true,
            include: [{
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
            }],
            as: 'help'
        },
        {
            attributes: ['id', 'email', 'firstname', 'lastname', 'avatar'],
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
});

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
            attributes: ['email', 'firstname', 'lastname'],
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
    } else {
        const currentDate = new Date();
        db.HelpResponse.create({
            accepted: false,
            reviewed: false,
            completed: false,
            isTutor: body.isTutor,
            idTradeType: body.idTradeType,
            idHelp: body.idHelp,
            idResponder: body.idResponder,
            message: body.message
        })
            .then(x => {
                db.Notification.create({
                    idUser: body.help.idCreator,
                    idHelp: body.help.id,
                    message: 'hai ricevuto una risposta alla tua richiesta di aiuto!',
                    createdAt: currentDate
                }),
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
        db.HelpResponse.findByPk(req.params.id, {
            include: [
                { model: db.Help, required: true, as: 'help' }
            ]
        })
            .then((response) => {
                const currentDate = new Date();
                response.update({
                    accepted: true,
                    acceptedAt: currentDate
                })
                    .then(() => {
                        db.HelpType.findByPk(response.help.idType).then(type => {
                            if (type.code != 'COH') {
                                response.help.update({
                                    accepted: true
                                })
                            }
                        })
                            .then(() => {
                                db.Notification.create({
                                    idUser: response.help.idResponder,
                                    idHelp: response.help.id,
                                    message: 'la tua risposta è stata accettata!',
                                    createdAt: currentDate
                                }),
                                    res.status(200).send(response)
                            })
                    })
            })
    }
});

// PUT /api/responses/cancel/5
router.put('/cancel/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.HelpResponse.findByPk(req.params.id, {
            include: [
                { model: db.Help, required: true, as: 'help' }
            ]
        })
            .then(function (response) {
                // Check if record exists in db
                if (response) {
                    const currentDate = new Date();
                    response.update({
                        accepted: false,
                        canceledAt: currentDate
                    })
                        .then(() => {
                            response.help.update({
                                accepted: false
                            })
                                .then(() => {
                                    res.status(200).send(response)
                                })
                        })
                }
            })
    }
});

// PUT /api/responses/feedback/5
router.put('/feedback/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.messageCreator === undefined) {
        res.status(400).send({ message: 'messageCreator is missing' });
    } else if (body.ratingCreator === undefined) {
        res.status(400).send({ message: 'ratingCreator is missing' });
    } else {
        db.HelpResponse.findByPk(req.params.id, {
            include: [
                { model: db.Help, required: true, as: 'help' }
            ]
        })
            .then(response => {
                const currentDate = new Date();
                response.update({
                    reviewed: true,
                    creatorReviewedAt: currentDate,
                    messageCreator: body.messageCreator,
                    imageReviewCreator: body.imageReviewCreator,
                    ratingCreator: body.ratingCreator
                })
                    .then(() => {
                        response.help.update({
                            reviewed: true
                        })
                            .then(() => {
                                db.Notification.create({
                                    idUser: response.help.idCreator,
                                    idHelp: response.help.id,
                                    message: 'hai ricevuto una nuova recensione!',
                                    createdAt: currentDate
                                }),
                                    res.status(201).send(response)
                            })
                    })
                    .catch(err => {
                        res.status(500).send(err)
                    });
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
    }
});

// PUT /api/responses/cohFeedback/5
router.put('/cohFeedback/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.messageCreator === undefined) {
        res.status(400).send({ message: 'messageCreator is missing' });
    } else if (body.ratingCreator === undefined) {
        res.status(400).send({ message: 'ratingCreator is missing' });
    } else {
        db.HelpResponse.findByPk(req.params.id, {
            include: [
                { model: db.Help, required: true, as: 'help' }
            ]
        })
            .then(response => {
                const currentDate = new Date();
                db.Help.findByPk(response.idHelp, {
                    include: [
                        {
                            model: db.HelpResponse,
                            where: { accepted: true },
                            required: true,
                            as: 'responses'
                        },
                        { model: db.User, require: true, as: 'creator' }
                    ]
                })
                    .then(help => {
                        const creatorLh = help.creator.likehelps;
                        // update creator
                        help.creator.update({
                            likehelps: creatorLh + 3
                        })
                        help.update({
                            reviewed: true
                        })
                            .then((help) => {
                                for (var resp in help.responses) {
                                    help.responses[resp].update({
                                        reviewed: true,
                                        creatorReviewedAt: currentDate,
                                        messageCreator: body.messageCreator,
                                        imageReviewCreator: body.imageReviewCreator,
                                        ratingCreator: body.ratingCreator
                                    })
                                    db.User.findByPk(help.responses[resp].idResponder)
                                        .then(responder => {
                                            const responderLh = responder.likehelps;
                                            db.Notification.create({
                                                idUser: responder.id,
                                                idHelp: help.id,
                                                message: 'hai ricevuto una nuova recensione!',
                                                createdAt: currentDate
                                            }),
                                                // update responder
                                                responder.update({
                                                    likehelps: responderLh + 1
                                                }),
                                                db.Notification.create({
                                                    idUser: responder.id,
                                                    idHelp: help.id,
                                                    message: 'hai guadagnato un likehelp!',
                                                    createdAt: currentDate
                                                })
                                        })
                                }
                            })
                    })
                    .catch(err => {
                        res.status(500).send(err)
                    });
                res.status(201).send(response)
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
    }
});

// PUT /api/responses/complete/5
router.put('/complete/:id', (req, res) => {
    const body = req.body;
    console.log('body', body)
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.messageResponder === undefined) {
        res.status(400).send({ message: 'messageResponder is missing' });
    } else if (body.ratingResponder === undefined) {
        res.status(400).send({ message: 'ratingResponder is missing' });
    } else {
        db.HelpResponse.findByPk(req.params.id, {
            include: [{
                model: db.Help,
                required: true,
                as: 'help',
                include: [{
                    attributes: ['id', 'likehelps'],
                    model: db.User,
                    required: true,
                    as: 'creator'
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
            .then(response => {
                // check if record exists in db
                const currentDate = new Date();
                const creatorLh = response.help.creator.likehelps;
                const responderLh = response.responder.likehelps;
                // update response
                response.update({
                    completed: true,
                    completedAt: currentDate,
                    responderReviewedAt: currentDate,
                    imageReviewResponder: body.imageReviewResponder,
                    messageResponder: body.messageResponder,
                    ratingResponder: body.ratingResponder
                }),
                    // update help
                    response.help.update({
                        completed: true
                    })
                db.HelpType.findByPk(response.help.idType)
                    .then(type => {
                        if (type.code != 'COH') {
                            // update creator
                            response.help.creator.update({
                                likehelps: creatorLh - 1
                            })
                            // update responder
                            response.responder.update({
                                likehelps: responderLh + 1
                            })
                            db.Notification.create({
                                idUser: response.help.creator.id,
                                idHelp: response.help.id,
                                message: 'hai ricevuto una nuova recensione!',
                                createdAt: currentDate
                            })
                            db.Notification.create({
                                idUser: response.responder.id,
                                idHelp: response.help.id,
                                message: 'hai guadagnato un likehelp!',
                                createdAt: currentDate
                            })
                        }
                        res.status(200).send(response);
                    })
            })
    }
});

// DELETE /api/responses/delete/id
router.delete('/delete/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.HelpResponse.findByPk(req.params.id)
            .then(function (helpResponse) {
                // Check if record exists in db
                if (helpResponse) {
                    helpResponse.destroy()
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

// exports
module.exports = router;
