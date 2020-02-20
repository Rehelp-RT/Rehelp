var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../models');

// GET /api/users/5
router.get('/:id', (req, res) => {
    db.User.findByPk(req.params.id, {
            attributes: ['id', 'avatar', 'username', 'firstname', 'lastname', 'birthdate', 'likehelps'],
            include: [{
                attributes: ['id', 'title', 'image'],
                model: db.Help,
                as: 'helps'
            }]
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });
});

// POST /api/user
router.post('/', function(req, res) {
    // User.create({ firstname: "Jane", lastname: "Doe" }).then(user => {
    //     res.send({ id: user.id });
    // });
});

// DELETE /api/user
router.delete('/', function(req, res) {
    // User.destroy({
    //     where: {
    //         firstname: "Jane"
    //     }
    // }).then(() => {
    //     res.send({ id: user.id });
    // });
});

// PUT /api/user/5/update
router.put('/:id/update', function(req, res) {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.User.findByPk(req.params.id)
            .then(function(user) {
                // Check if record exists in db
                if (user) {
                    user.update({
                            firstname: body.firstname,
                            lastname: body.lastname,
                            latitude: body.latitude,
                            longitude: body.longitude,
                            address: body.address,
                            birthdate: body.birthdate,
                            username: body.username,
                            password: body.password
                        })
                        .then(x => {
                            res.status(200).send(user)
                        })
                }
            })
    }
});

// PUT /api/user/5/upload-avatar
router.put('/:id/upload-avatar', function(req, res) {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.User.findByPk(req.params.id)
            .then(function(user) {
                // Check if record exists in db
                if (user) {
                    user.update({ avatar: body.path })
                        .then(x => {
                            res.status(200).send(user)
                        })
                }
            })
    }
});

// exports
module.exports = router;