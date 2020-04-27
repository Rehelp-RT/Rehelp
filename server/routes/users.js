var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/users
router.get('/', (req, res) => {
    db.User.findAll({
            attributes: [
                'id',
                'username',
                'firstname',
                'lastname',
                'avatar',
                'city',
                'country',
                'latitude',
                'longitude',
                'birthdate'
            ],
            include: [{
                    required: false,
                    model: db.Help,
                    attributes: ['id'],
                    as: 'helps',
                    where: { completed: true },
                    include: [{
                        model: db.HelpResponse,
                        attributes: ['ratingResponder'],
                        as: 'responses',
                        where: {
                            [Op.not]: { ratingResponder: null }
                        }
                    }]
                },
                {
                    required: false,
                    model: db.HelpResponse,
                    attributes: ['ratingCreator'],
                    as: 'responses',
                    where: {
                        [Op.not]: { ratingCreator: null }
                    }
                }
            ]
        })
        .then(x => {
            res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        });
});

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
router.put('/:id/upload-avatar', (req, res) => {
    const body = req.body;
    if (body == undefined || body.path == undefined) {
        res.sendStatus(400)
    } else {
        db.User.findByPk(req.params.id).then((user) => {
            if (user) {
                // user exists
                user.update({ avatar: body.path }).then(() => {
                    res.status(200).send(user)
                })
            }
        })
    }
});

// GET /api/users/5/categories
router.get('/:id/categories', (req, res) => {
    db.User.findByPk(req.params.id, {
            attributes: ['id'],
            include: [{
                as: 'categories',
                model: db.HelpCategory,
                attributes: ['id', 'code', 'name'],
                include: [{
                    attributes: ['id', 'code', 'name'],
                    model: db.HelpCategory,
                    as: 'parent',
                    include: [{
                        attributes: ['id', 'code', 'name'],
                        model: db.HelpCategory,
                        as: 'parent'
                    }]
                }]
            }]
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            } else {
                res.json(user)
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id,
                error: err
            });
        });
});

// POST /api/user/5/category
router.post('/:id/category', (req, res) => {
    const body = req.body;
    if (body == undefined || body.idCategory == undefined) {
        res.sendStatus(400)
    } else {
        // find user
        db.User.findByPk(req.params.id).then(function(user) {
            db.HelpCategory.findByPk(body.idCategory).then((category) => {
                if (user && category) {
                    // user and category exist
                    db.Categories_Users.findOne({
                            where: {
                                [Op.and]: [{ idCategory: category.id }, { idUser: user.id }]
                            }
                        })
                        .then(catUser => {
                            if (catUser) {
                                // conflict
                                res.sendStatus(409)
                            } else {
                                // insert
                                db.Categories_Users.create({
                                        idCategory: category.id,
                                        idUser: user.id
                                    })
                                    .then(cu => {
                                        // inserted
                                        res.status(201).send(cu)
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).send(err.message)
                                    });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).send(err.message)
                        });
                } else {
                    // user not found
                    res.sendStatus(404);
                }
            })
        })
    }
});

// exports
module.exports = router;
