var router = require('express').Router();
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Op } = require('sequelize');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require("nodemailer");
const crypto = require("crypto")

// GET /api/version
router.get('/version', function(req, res) {
    res.send({ version: 'v0.2.0' });
});

// POST /api/signup
router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password || !req.body.cf) {
        res.status(400).send({ msg: 'Please pass email, password and codice fiscale.' })
    } else {

        User.findOne({
                where: {
                    $or :[
                        {email: req.body.email},
                        {cf: req.body.cf}
                    ]
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
                            res.json(getLoggedUser(user, token, expiresIn));
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(400).send(error);
                        });
                } else {
                    const msg = 'Informazioni già utilizzate.';
                    if (registeredUser.email === req.body.email) msg = 'Email già utilizzata.';
                    else if (registeredUser.cf === req.body.cf) msg = 'Codice fiscale già utilizzato.';
                    return res.status(409).send({
                        message: msg,
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
                        required: false,
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
                    message: 'Autenticazione fallita. Utente non trovato.',
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
                        message: 'Autenticazione fallita, password non corretta.'
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
                            required:false,
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

// POST /api/recaptcha_token_validate
router.post('/recaptcha_token_validate', function(req, res) {

  let token = req.body.recaptcha;

  // the secret key from your google admin console;
  const secretKey = "***REMOVED-RECAPTCHA-SECRET***";

  // token validation url is URL: https://www.google.com/recaptcha/api/siteverify
  // METHOD used is: POST

  const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

  // note that remoteip is the users ip address and it is optional
  // in node req.connection.remoteAddress gives the users ip address

  if(token === null || token === undefined){
    res.status(201).send({success: false, message: "Token is empty or invalid"})
    return console.log("token empty");
  }

  request(url, function(err, response, body){
    // the body is the data that contains success message
    body = JSON.parse(body);
    // check if the validation failed
    if(body.success !== undefined && !body.success){
         res.send({success: false, 'message': "recaptcha failed"});
         return console.log("failed")
     }
    // if passed response success message to client
     res.send({"success": true, 'message': "recaptcha passed"});
  })
});

// POST /api/recoveryPassword
router.post('/recoveryPassword', function(req, res) {
  if (req.body == null || req.body == undefined) {
    res.status(400).send({ msg: 'Something goes wrong.' })
  } else {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port: 587,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "monitor.rehelp@gmail.com",
        pass: "***REMOVED-GMAIL-PASSWORD***",
      },
    });
    User.findOne({
            where: { email: req.body.email },
        })
        .then(user => {
          if (!user) {
            return res.status(401).send({
              message: 'User not found.',
          });
          } else {
              // registered user
              const appUrl = (process.env.MODE === 'production') ? 'rehelp.app' : `localhost:4200`;

              let token = crypto.randomBytes(16).toString('hex');

              let tokenExpire = Date.now() + 3600000; // + 1 ora.
              user.update({
                resetPasswordToken: token,
                resetPasswordExpire: tokenExpire
              }).then(x => {
                let link = `https://${appUrl}/password-reset/` + token;
                let mailOptions = {
                  from : 'ReHelp',
                  to : req.body.email,
                  subject : "Reset Password",
                  html : "Ciao " + user.firstname + " " + user.lastname + ",<br> Hai ricevuto questa mail perchè tu o qualcun altro ha effettuato la richiesta di resettare la password del tuo account.<br> Per favore clicca sul seguente link per completare la richiesta.<br><a href="+link+">Clicca qui per resettare la password</a>"
                }
                transporter.sendMail(mailOptions, function(err, res) {
                  if(err) {
                    return res.status(500).send({
                      message: "Error " + err
                    });
                  }
                });
                res.status(200).send({
                  user,
                  message: 'E-mail inviata a ' + user.email + ' con le istruzioni per il recupero della password.'
                });
          })}
      }).catch((error) => {
          console.log(error)
          res.status(400).send(error)
      });
}});

// GET /api/passwordReset
router.post('/passwordReset/:token', function(req, res) {
  User.findOne({
    where: {
        resetPasswordToken: req.params.token
    }
})
.then((user) => {
    var expired = false;
    if (!user) {
        console.log('not user')
        return res.status(401).send({
          message: 'User not found.'
        })
    } else if (user.resetPasswordExpire < Date.now()) {
      expired = true;
      res.send(expired);
    }
    else {
        return res.send(user);
    }
})
});

getLoggedUser = function(user, token, expiresIn) {
    return {
        id: user.id,
        avatar: user.avatar,
        birthdate: user.birthdate,
        city: user.city,
        country: user.country,
        description: user.description,
        email: user.email,
        cf:user.cf,
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
