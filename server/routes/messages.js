var router = require('express').Router();
const db = require('../models');

// GET /api/messages/5?idHelp=4
router.get('/', (req, res) =>
    db.Message.findAll({
        attributes: ['body', 'idAuthor', 'createdAt'],
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'author'
        }],
        where: { idHelp: req.query.idHelp }
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
);

// exports
module.exports = router;
