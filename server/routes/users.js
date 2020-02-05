var router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../models');

// GET /api/users/5
router.get('/:id', (req, res) => {
    db.User.findByPk(req.params.id, {
            attributes: ['id', 'username', 'firstname', 'lastname', 'birthdate', 'likehelps']
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

// PUT /api/user
router.put('/', function(req, res) {
    // User.update({ lastname: "Doe" }, {
    //     where: {
    //         lastname: null
    //     }
    // }).then(() => {
    //     res.send({ id: user.id });
    // });
});

// exports
module.exports = router;