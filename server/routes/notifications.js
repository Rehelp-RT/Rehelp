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
        },
        {
            attributes: ['id', 'firstname', 'lastname', 'username'],
            model: db.User,
            as: 'user'
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

// GET /api/notifications/user/:id
router.get('/user/:id', (req, res) => {
    db.User.findByPk(req.params.id, {
        attributes: ['id', 'firstname', 'lastname', 'username'],
        include: [{
            attributes: ['id', 'message', 'checked', 'createdAt'],
            model: db.Notification,
            as: 'notifications'
        }]
    })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
}
);

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
