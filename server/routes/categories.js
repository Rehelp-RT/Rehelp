var router = require('express').Router();
const db = require('../models');

// GET /api/categories
router.get('/', (req, res) =>
    db.HelpCategory.findAll({ attributes: ['code', 'name'] })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
);

// exports
module.exports = router;