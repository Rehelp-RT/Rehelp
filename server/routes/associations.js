var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');


// GET /api/associations
router.get('/', (req, res) => {
    db.Associations.findAll({
        attributes: ['id', 'name', 'secretId']
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
  }
);

// GET /api/associations/5
router.get('/:id', (req, res) =>
    db.Associations.findByPk(req.params.id, {
      attributes: ['id', 'name', 'secretId']
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