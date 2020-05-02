var router = require('express').Router();
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/version
router.get('/version', function(req, res) {
    res.send({ version: 'v0.2.0' });
});

// POST /api/signup
router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ msg: 'Please pass email and password.' })
    } else {

        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((registeredUser) => {
                if (!registeredUser) {
                    User
                        .create({
                            email: req.body.email,
                            password: req.body.password,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            birthdate: req.body.birthdate,
                            loginLocal: true
                        })
                        .then((user) => {
                            var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                            var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                            res.json({ success: true, user: user, token: 'JWT ' + token, expiresIn: expiresIn });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(400).send(error);
                        });
                } else {
                    return res.status(409).send({
                        message: 'Email già utilizzata.',
                    });
                }
            })
    }
});

// POST /api/signin
router.post('/signin', function(req, res) {
    User.findOne({
            where: {
                email: req.body.email
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
                }
            ]
        })
        .then(user => {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                    var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                    jwt.verify(token, '***REMOVED-JWT-SECRET***', function(err, data) {
                        console.log(err, data);
                    });

                    // sum reviews where user is responder
                    const ratedResponses = user.responses.filter(r => {
                        if (r.ratingCreator !== undefined) {
                            return r.ratingCreator;
                        }
                    });
                    user.responsesReviewsCount = ratedResponses.length;
                    user.responsesReviewsSum = ratedResponses.reduce((prev, cur) => {
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

                    user.helpsReviewsCount = ratedHelpsResponses.length;
                    user.helpsReviewsSum = flatArray.reduce((prev, cur) => {
                        return prev + cur.ratingResponder;
                    }, 0);

                    res.json(getLoggedUser(user, token, expiresIn));
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        });
});

// POST /api/socialLogin
router.post('/socialLogin', function(req, res) {
    if (req.body == null || req.body == undefined) {
        res.status(400).send({ msg: 'Something goes wrong.' })
    } else {
        User.findOne({
                where: { email: req.body.email },
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
            .then(user => {
                if (!user) {
                    // new user
                    var randomstring = Math.random().toString(36).slice(-8);

                    User.create({
                            email: req.body.email,
                            password: randomstring,
                            firstname: req.body.firstName,
                            lastname: req.body.lastName,
                            idFacebook: req.body.provider === 'FACEBOOK' ? req.body.photoUrl : null,
                            idGoogle: req.body.provider === 'GOOGLE' ? req.body.photoUrl : null,
                            loginFacebook: req.body.provider === 'FACEBOOK' ? true : false,
                            loginGoogle: req.body.provider === 'GOOGLE' ? true : false
                        })
                        .then(user => {
                            var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                            var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                            res.json(getLoggedUser(user, token, expiresIn));
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(400).send(error)
                        });
                } else {
                    // registered user
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                    var expiresIn = JSON.parse(JSON.stringify(86400 * 30));

                    // sum reviews where user is responder
                    const ratedResponses = user.responses.filter(r => {
                        if (r.ratingCreator !== undefined) {
                            return r.ratingCreator;
                        }
                    });
                    user.responsesReviewsCount = ratedResponses.length;
                    user.responsesReviewsSum = ratedResponses.reduce((prev, cur) => {
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
                    user.helpsReviewsCount = ratedHelpsResponses.length;
                    user.helpsReviewsSum = flatArray.reduce((prev, cur) => {
                        return prev + cur.ratingResponder;
                    }, 0);

                    if (req.body.provider === 'FACEBOOK' && (user.idFacebook === null || user.loginFacebook === null)) {
                        // update with Facebook id
                        user.update({ idFacebook: req.body.photoUrl, loginFacebook: true }).then(user => {
                            res.json(getLoggedUser(user, token, expiresIn));
                        });
                    } else if (req.body.provider === 'GOOGLE' && (user.idGoogle === null || user.loginGoogle === null)) {
                        // update with Google id
                        user.update({ idGoogle: req.body.photoUrl, loginGoogle: true }).then(user => {
                            res.json(getLoggedUser(user, token, expiresIn));
                        });
                    } else {
                        // already updated
                        res.json(getLoggedUser(user, token, expiresIn));
                    }
                }
            }).catch((error) => {
                console.log(error)
                res.status(400).send(error)
            })
    }
});

getLoggedUser = function(user, token, expiresIn) {
    return {
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
        responsesReviewsCount: user.responsesReviewsCount,
        responsesReviewsSum: user.responsesReviewsSum,
        helpsReviewsCount: user.helpsReviewsCount,
        helpsReviewsSum: user.helpsReviewsSum,
        token: 'JWT ' + token,
        expiresIn: expiresIn,
        success: true
    };
}

// Function to extract token
getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

// exports
module.exports = router;
