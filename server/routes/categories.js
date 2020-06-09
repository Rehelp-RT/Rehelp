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
            order: [
                ['name', 'ASC'],
                [{ model: db.HelpCategory, as: 'children' }, 'name', 'ASC']
            ],
            where: {
                [Op.and]: filters
            },
            include: [{
                model: db.HelpCategory,
                as: 'children',
                include: [{
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
