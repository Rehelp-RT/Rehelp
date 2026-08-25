var router = require('express').Router();
const db = require('../models');

// GET /api/messages?idHelp=4&idResponse=7
router.get('/', (req, res) => {
    const where = { idHelp: req.query.idHelp };
    if (req.query.idResponse !== undefined) {
        where.idResponse = req.query.idResponse;
    }
    db.Message.findAll({
        attributes: ['id', 'body', 'imageUrl', 'idAuthor', 'idResponse', 'createdAt'],
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
        where
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    });
});

// exports
module.exports = router;
