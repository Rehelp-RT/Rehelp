var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../models');
const { Op, Sequelize } = require('sequelize');

// GET /api/users
router.get('/', (req, res) => {

    //mt to km
    var distance = req.query.distance !== undefined ? req.query.distance * 1000 : undefined;
    var latit = req.query.lat !== undefined ? parseFloat(req.query.lat) : undefined;
    var longit = req.query.long !== undefined ? parseFloat(req.query.long) : undefined;

    var category = null;
    if (req.query.category !== undefined){
        category = req.query.category;
    }
    var filters = [];
    if (distance !== undefined && longit !== undefined && latit !== undefined) {
        filters.push({
            [Op.and]: [
                Sequelize.fn(
                    //https://postgis.net/docs/ST_DWithin.html
                    'ST_DWithin',
                    // https://postgis.net/docs/ST_MakePoint.html
                    Sequelize.fn('ST_MakePoint', Sequelize.col('User.longitude'), Sequelize.col('User.latitude')),
                    Sequelize.fn('ST_MakePoint', longit, latit),
                    distance,
                    true
                )
            ]
        });
    }
    
    console.log('req.query.category', req.query.category);
    console.log('filters', filters);

    db.User.findAll({
            attributes: [
                'id',
                'email',
                'firstname',
                'lastname',
                'avatar',
                'city',
                'country',
                'latitude',
                'longitude',
                'birthdate',
                'loginLocal',
                'loginFacebook',
                'loginGoogle'
            ],
            where: {
                [Op.and]: filters
            },
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
                },
                {
                    required: category != null ? true : false,
                    model: db.HelpCategory,
                    attributes: ['id'],
                    as: 'categories',
                    where: {
                        [Op.and]: {id: category}
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
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle'
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
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }

            // sum reviews where user is responder
            const ratedResponses = user.responses.filter(r => {
                if (r.ratingCreator !== undefined) {
                    return r.ratingCreator;
                }
            });
            const sumResponses = ratedResponses.reduce((prev, cur) => {
                return prev + cur.ratingCreator;
            }, 0);

            // sum reviews where user is creator
            const ratedHelps = user.helps.filter(h => {
                const ress = h.responses.filter(r => {
                    if (r.ratingResponder !== undefined) {
                        return r.ratingResponder;
                    }
                });
                return (ress.length > 0) ? h : null;
            });
            const ratedHelpsResponses =
                ratedHelps.map(h =>
                    h.responses.filter(r =>
                        (r.ratingResponder)));
            const flatArray = Array.prototype.concat.apply([], ratedHelpsResponses);
            const sumHelps = flatArray.reduce((prev, cur) => {
                return prev + cur.ratingResponder;
            }, 0);

            res.send({
                id: user.id,
                avatar: user.avatar,
                birthdate: user.birthdate,
                city: user.city,
                country: user.country,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                latitude: user.latitude,
                longitude: user.longitude,
                likehelps: user.likehelps,
                loginLocal: user.loginLocal,
                loginFacebook: user.loginFacebook,
                loginGoogle: user.loginGoogle,
                idFacebook: user.idFacebook,
                idGoogle: user.idGoogle,
                responsesReviewsCount: ratedResponses.length,
                responsesReviewsSum: sumResponses,
                helpsReviewsCount: ratedHelpsResponses.length,
                helpsReviewsSum: sumHelps
            });
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

// PUT /api/users/5/update
router.put('/:id/update', function(req, res) {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        db.User.findByPk(req.params.id)
            .then(function (user) {
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

// GET /api/users/5/categories2
router.get('/:id/categories2', (req, res) => {
    db.Categories_Users.findAll({
            attributes: ['idCategory'],
            where: { idUser: req.params.id }
        })
        .then(cu => {
            if (!cu) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            } else {
                db.HelpCategory.findAll({
                        attributes: ['id', 'code', 'name'],
                        where: { code: null },
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
                    })
                    .then(cats => {
                        const idUserCategories = cu.map(x => x.idCategory);
                        res.json(cats.map(x => {
                            return {
                                id: x.id,
                                code: x.code,
                                name: x.name,
                                parent: x.parent,
                                checked: idUserCategories.includes(x.id)
                            }
                        }))
                    })
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

// PUT /api/user/5/categories
router.put('/:id/categories', (req, res) => {
    const body = req.body;
    console.log(body);
    if (body == undefined || body.length == 0) {
        res.sendStatus(400)
    } else {
        const requestedIds = body;
        const idUser = req.params.id;

        // find user
        db.User.findByPk(idUser).then(function(user) {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                // exclude already inserted categories
                db.Categories_Users.findAll({
                        where: { idUser: user.id }
                    })
                    .then(cu => {
                        const existingIds = cu.map(x => x.idCategory);
                        const removableIds = [];
                        const insertableIds = [];

                        existingIds.forEach(id => {
                            if (!requestedIds.includes(id)) {
                                removableIds.push(id);
                            }
                        });
                        requestedIds.forEach(id => {
                            if (!existingIds.includes(id)) {
                                insertableIds.push({ idCategory: id, idUser: idUser });
                            }
                        });

                        // insert missing categoryIds
                        db.Categories_Users.bulkCreate(insertableIds, { individualHooks: true })
                            .then(inserted => {
                                // remove not requested categories
                                db.Categories_Users.destroy({
                                        where: {
                                            [Op.and]: [{
                                                idCategory: removableIds
                                            }, {
                                                idUser: idUser
                                            }]
                                        },
                                        individualHooks: true
                                    })
                                    .then(removed => {
                                        res.status(200).json({ inserted: inserted.length, removed: removed });
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).send('error while removing')
                                    });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).send('error while inserting')
                            });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send(err.message)
                    });
            }
        });
    }
});

// exports
module.exports = router;
