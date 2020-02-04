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
                attributes: ['username', 'firstname', 'lastname', 'avatar'],
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
                include: [
                    { attributes: ['id', 'title'], model: db.Help, required: true },
                    { attributes: ['username', 'firstname', 'lastname'], model: db.User, required: true }
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
    } else if (body.accepted === undefined) {
        res.status(400).send({ message: 'accepted is missing' });
    } else if (body.completed === undefined) {
        res.status(400).send({ message: 'completed is missing' });
    } else if (body.isTutor === undefined) {
        res.status(400).send({ message: 'isTutor is missing' });
    } else if (body.id_tradeType === undefined) {
        res.status(400).send({ message: 'id_tradeType is missing' });
    } else if (body.id_help === undefined) {
        res.status(400).send({ message: 'id_help is missing' });
    } else if (body.id_responder === undefined) {
        res.status(400).send({ message: 'id_responder is missing' });
    } else {

        db.HelpResponse.create({
                accepted: body.accepted,
                completed: body.completed,
                isTutor: body.isTutor,
                id_tradeType: body.id_tradeType,
                id_help: body.id_help,
                id_responder: body.id_responder
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

// exports
module.exports = router;