var router = require('express').Router();
const db = require('../models');

// GET /api/helps
router.get('/', (req, res) =>
    db.Help.findAll({
        include: [{
            model: db.HelpCategory,
            required: true
        }]
    })
    .then(helps => {
        res.json(helps)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
);

// POST /api/helps/add
router.post('/add', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else if (body.title === undefined) {
        res.status(400).send({ message: 'title is missing' });
    } else if (body.description === undefined) {
        res.status(400).send({ message: 'description is missing' });
    } else if (body.id_category === undefined) {
        res.status(400).send({ message: 'id_category is missing' });
    } else {

        db.Help.create({
                title: body.title,
                description: body.description,
                id_category: body.id_category
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