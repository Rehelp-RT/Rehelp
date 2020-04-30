var router = require('express').Router();
const User = require('../models').User;
const jwt = require('jsonwebtoken');


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
          }
          else {
            return res.status(409).send({
              message: 'Email già utilizzata.',
            });
          }
        })
    }
});

// POST /api/socialLogin
router.post('/socialLogin', function(req, res) {
  if (req.body == null || req.body == undefined) {
    res.status(400).send({ msg: 'Something goes wrong.' })
  }
  else {
    User.findOne({
      where: {
          email: req.body.email
      }
    })
    .then((registeredUser) => {
        if (!registeredUser) {
          var randomstring = Math.random().toString(36).slice(-8);
          console.log(req.body, 'req.body')
          User
              .create({
                  email: req.body.email,
                  password: randomstring,
                  firstname: req.body.firstName,
                  lastname: req.body.lastName,
                  loginFacebook: req.body.provider === 'FACEBOOK' ? true : false,
                  loginGoogle: req.body.provider === 'GOOGLE' ? true : false
              })
              .then((user) => {
                  var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                  var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                  res.json({ success: true, user: user, token: 'JWT ' + token, expiresIn: expiresIn });
              })
              .catch((error) => {
                  console.log(error)
                  res.status(400).send(error)
              });
        }
        else {
          var token = jwt.sign(JSON.parse(JSON.stringify(registeredUser)), '***REMOVED-JWT-SECRET***');
          var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
          res.json({ success: true, user: registeredUser, token: 'JWT ' + token, expiresIn: expiresIn });
        }
    }).catch((error) => {
      console.log(error)
      res.status(400).send(error)
    })
  }
});


// POST /api/signin
router.post('/signin', function(req, res) {
    User.findOne({
            where: {
                email: req.body.email
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
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                    var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                    console.log
                    jwt.verify(token, '***REMOVED-JWT-SECRET***', function(err, data) {
                        console.log(err, data);
                    })
                    res.json({
                        id: user.id,
                        avatar: user.avatar,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        birthdate: user.birthdate,
                        likehelps: user.likehelps,
                        token: 'JWT ' + token,
                        expiresIn: expiresIn,
                        success: true
                    });
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
