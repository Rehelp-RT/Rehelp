var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../models');

// GET /api/users/5
router.get('/:id', (req, res) => {
    db.User.findByPk(req.params.id, {
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude',
                'username', 'likehelps'
            ],
            include: [{
                    attributes: ['id', 'title', 'image', 'accepted', 'reviewed', 'completed'],
                    model: db.Help,
                    as: 'helps',
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
                        },
                        {
                            attributes: ['accepted', 'ratingResponder'],
                            model: db.HelpResponse,
                            as: 'responses'
                        }
                    ]
                },
                {
                    attributes: ['accepted', 'ratingCreator'],
                    model: db.HelpResponse,
                    as: 'responses',
                    include: [{
                        attributes: ['id', 'title', 'image', 'accepted', 'reviewed', 'completed'],
                        model: db.Help,
                        as: 'help',
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
                        }]
                    }]
                }
            ]
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
                            birthdate: body.birthdate,
                            city: body.city,
                            country: body.country,
                            email: body.email,
                            firstname: body.firstname,
                            lastname: body.lastname,
                            latitude: body.latitude,
                            longitude: body.longitude
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
