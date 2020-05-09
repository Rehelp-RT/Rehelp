var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/categories
router.get('/', (req, res) => {

    // filters
    var filters = [{ idParent: null }];
    if (req.query.idHelpType !== undefined) {
      filters.push({
        idHelpType: req.query.idHelpType
      })
    }

    db.HelpCategory.findAll({
            attributes: ['id', 'code', 'name', 'idHelpType'],
            where: {
                [Op.and]: filters
            },
            include: [{
                attributes: ['id', 'name', 'idHelpType'],
                model: db.HelpCategory,
                as: 'children',
                include: [{
                    attributes: ['id', 'name', 'idHelpType'],
                    model: db.HelpCategory,
                    as: 'children'
                }]
            }]
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
