var router = require('express').Router();
const db = require('../models');

// GET /api/messages/5
router.get('/', (req, res) =>
    db.Message.findAll({
        attributes: ['body', 'idAuthor', 'createdAt'],
        include: [{
            attributes: ['id', 'avatar', 'firstname', 'lastname'],
            model: db.User,
            required: true,
            as: 'author'
        }],
        where: { idResponse: req.query.idResponse }
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
