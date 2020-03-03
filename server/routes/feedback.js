var router = require('express').Router();
const db = require('../models');

// GET /api/feedback
router.get('/', (req, res) =>
    db.Feedback.findAll({
        attributes: ['id', 'message', 'rating', 'idHelp', 'createdAt'],
        include: [{
            attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
            model: db.User,
            required: true,
            as: 'reviewer'
        },
        {
            attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
            model: db.User,
            required: true,
            as: 'reviewed'
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

// GET /api/feedback/5
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

// POST /api/feedback/
router.post('/', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.messageCreator === undefined) {
        res.status(400).send({ message: 'messageCreator is missing' });
    } else if (body.ratingCreator === undefined) {
        res.status(400).send({ message: 'ratingCreator is missing' });
    } else if (body.idResponse === undefined) {
        res.status(400).send({ message: 'idResponse is missing' });
    } else {
        const currentDate = new Date();
        db.Feedback.create({
            idResponse: body.idResponse,
            messageCreator: body.messageCreator,
            ratingCreator: body.ratingCreator
        })
            .then(x => {
                res.status(201).send(x)
            })
            .catch(err => {
                res.status(500).send(err)
            });
    }
});

// PUT /api/feedback/
router.put('/id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.messageResponder === undefined) {
        res.status(400).send({ message: 'messageResponder is missing' });
    } else if (body.rating === undefined) {
        res.status(400).send({ message: 'rating is missing' });
    } else {
        db.Feedback.findByPk(req.params.id)
            .then(function (feedback) {
                // Check if record exists in db
                if (feedback) {
                    feedback.update({
                        messageResponder: body.messageResponder,
                        ratingResponder: body.ratingResponder
                    })
                        .then(x => {
                            res.status(200).send(feedback)
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