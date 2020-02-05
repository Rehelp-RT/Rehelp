var router = require('express').Router();
const db = require('../models');

// GET /api/helps
router.get('/', (req, res) =>
    db.Help.findAll({
        attributes: ['id', 'title', 'image'],
        include: [
            { attributes: ['code', 'name'], model: db.HelpType, required: true },
            { attributes: ['code', 'name'], model: db.HelpCategory, required: true },
            { attributes: ['username', 'firstname', 'lastname'], model: db.User, required: true }
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

// GET /api/helps/5
router.get('/:id', (req, res) => {
    db.Help.findByPk(req.params.id, {
            include: [
                { attributes: ['code', 'name'], model: db.HelpType, required: true },
                { attributes: ['code', 'name'], model: db.HelpCategory, required: true },
                { attributes: ['username', 'firstname', 'lastname'], model: db.User, required: true },
                {
                    attributes: ['id', 'accepted', 'completed'],
                    include: [{
                        attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
                        model: db.User,
                        required: true,
                        as: 'responder'
                    }],
                    model: db.HelpResponse,
                    as: 'responses'
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
    } else {

        db.Help.create({
                title: body.title,
                description: body.description,
                id_type: body.idType,
                id_category: body.idCategory,
                id_creator: body.idCreator,
                halfhourValidity: body.halfhourValidity,
                dateStartValidity: body.dateStartValidity,
                dateEndValidity: body.dateEndValidity,
                dateCompletion: null,
                image: body.image
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

// exports
module.exports = router;