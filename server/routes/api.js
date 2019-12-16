const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const models = require('../models');
const User = require('../models').User;

/*--- Version ---*/

// GET /api/version
router.get('/version', function (req, res) {
    res.send({ version: 'v0.2.0' });
});



/*--- Helps ---*/

// get help list
router.get('/helps', (req, res) =>
    models.Help.findAll()
        .then(helps => {
            res.json(helps)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
);

// add an help
router.post('/helps/add', (req, res) => {
    const body = req.body;
    if (body == undefined) {
        res.sendStatus(400)
    } else {
        models.Help.create(body)
            .then(help => {
                console.log(help);
                res.sendStatus(201)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            });
    }
});

/*--- Users ---*/

// POST /api/user
router.post('/user', function (req, res) {
    User.create({ firstName: "Jane", lastName: "Doe" }).then(user => {
        res.send({ id: user.id });
    });
});

// DELETE /api/user
router.delete('/user', function (req, res) {
    User.destroy({
        where: {
            firstName: "Jane"
        }
    }).then(() => {
        res.send({ id: user.id });
    });
});

// PUT /api/user
router.put('/user', function (req, res) {
    User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    }).then(() => {
        res.send({ id: user.id });
    });
});


/*--- Authentication ---*/

// Signup

router.post('/signup', function (req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Please pass usernamer and password.' })
    } else {
        User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    }
});

// Signin

router.post('/signin', function (req, res) {
    User
        .find({
            where: {
                username: req.body.username
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***', { expiresIn: 86400 * 30 });
                    jwt.verify(token, '***REMOVED-JWT-SECRET***', function (err, data) {
                        console.log(err, data);
                    })
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrongg password.' });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});

// Function to extract token
getToken = function (headers) {
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