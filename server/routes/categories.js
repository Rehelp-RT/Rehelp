var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/categories
router.get('/', (req, res) => {

    // filters
    filters = [{ idParent: null }];

    db.HelpCategory.findAll({
            attributes: ['id', 'code', 'name'],
            where: {
                [Op.and]: filters
            },
            include: [{
                attributes: ['id', 'name'],
                model: db.HelpCategory,
                as: 'children',
                include: [{
                    attributes: ['id', 'name'],
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
