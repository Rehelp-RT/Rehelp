const express = require('express');
const models = require('../models');
const router = express.Router();

/*--- Version ---*/

// GET /api/version
router.get('/version', function(req, res) {
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
router.post('/user', function(req, res) {
    User.create({ firstName: "Jane", lastName: "Doe" }).then(user => {
        res.send({ id: user.id });
    });
});

// DELETE /api/user
router.delete('/user', function(req, res) {
    User.destroy({
        where: {
            firstName: "Jane"
        }
    }).then(() => {
        res.send({ id: user.id });
    });
});

// PUT /api/user
router.put('/user', function(req, res) {
    User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    }).then(() => {
        res.send({ id: user.id });
    });
});



// exports
module.exports = router;