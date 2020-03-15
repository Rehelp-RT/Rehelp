var router = require('express').Router();
const db = require('../models');

// GET /api/notifications
router.get('/', (req, res) =>
    db.Notification.findAll({
        attributes: ['id', 'message', 'checked', 'createdAt'],
        include: [{
            attributes: ['id', 'title'],
            model: db.Help,
            as: 'help'
        // },
        // {
        //     attributes: ['id', 'username'],
        //     model: db.User,
        //     as: 'user'
        }]
    })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
);


// GET /api/notifications/user/5
router.get('/:id', (req, res) => {
    db.Notification.findByPk(
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
            as: 'user'
        }
        ]
    })
        .then(x => {
            if (!x) {
                return res.status(404).send({
                    message: 'Notification with id ' + req.params.id + ' not found.'
                });
            }
            res.send(x);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Notification with id ' + req.params.id + ' not found.'
                });
            }
            return res.status(500).send({
                message: err.message
            });
        });
});

// PUT /api/notifications/check/5
router.put('/check/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.Notification.findByPk(req.params.id, {
            include: [
                { model: db.Help, required: true, as: 'help' }
            ]
        })
            .then((notification) => {
                const currentDate = new Date();
                notification.update({
                    checked: true,
                    updatedAt: currentDate
                }),
                    res.status(200).send(response)
            })
    }
});

// exports
module.exports = router;
