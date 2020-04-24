var router = require('express').Router();
const db = require('../models');
const { Op } = require("sequelize");

// GET /api/notifications
router.get('/', (req, res) =>
    db.Notification.findAll({
        attributes: ['id', 'message', 'checked', 'createdAt'],
        include: [{
                attributes: ['id', 'title'],
                model: db.Help,
                as: 'help'
            },
            {
                attributes: ['id', 'firstname', 'lastname', 'username'],
                model: db.User,
                as: 'user'
            }
        ]
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
);

// GET /api/notifications/user/:id
router.get('/user/:id', (req, res) => {
    var filter = {
        [Op.and]: [{ idUser: req.params.id },
            { checked: false },
        ],
    };

    db.Notification.findAll({
            where: filter,
            order: [
                ['createdAt', 'desc']
            ]
        })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500)
        })
});

// PUT /api/notifications/check/5
router.put('/check/:id', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.Notification.findByPk(req.params.id)
            .then((notification) => {
                const currentDate = new Date();
                notification.update({
                        checked: true,
                        updatedAt: currentDate
                    })
                    .then(x => {
                        res.status(200).send(x)
                    })
            })
    }
});

// exports
module.exports = router;