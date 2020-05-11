var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/tradetypes
router.get('/', (req, res) => {
    db.TradeType.findAll({
            attributes: ['id', 'code', 'name'],
        })
        .then(x => {
          res.json(x)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});

// exports
module.exports = router;
