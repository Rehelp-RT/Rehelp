var router = require('express').Router();

// GET /api/version
router.get('/version', function(req, res) {
    res.send({ version: 'v0.2.0' });
});

// GET /api/signup
router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        User
            .create({
                username: req.body.username,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate
            })
            .then((user) => {
                var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                //res.status(201).send(user, token, expiresIn);
                res.json({ success: true, user: user, token: 'JWT ' + token, expiresIn: expiresIn });
                // res.json({ success: true, token: 'JWT ' + token, expiresIn: expiresIn });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    }
});

// POST /api/signin
router.post('/signin', function(req, res) {
    User.findOne({
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
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), '***REMOVED-JWT-SECRET***');
                    var expiresIn = JSON.parse(JSON.stringify(86400 * 30));
                    console.log
                    jwt.verify(token, '***REMOVED-JWT-SECRET***', function(err, data) {
                        console.log(err, data);
                    })
                    res.json({
                        success: true,
                        userId: user.id,
                        avatar: user.avatar,
                        username: user.username,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        token: 'JWT ' + token,
                        expiresIn: expiresIn
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