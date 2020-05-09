var router = require('express').Router();
const db = require('../models');

// GET /api/types/MEH
router.get('/:code', (req, res) => {
    db.HelpType.findOne({
            attributes: ['id', 'code', 'name'],
            where: { code: req.params.code }
        })
        .then(x => {
            if (!x) {
                return res.status(404).send({
                    message: 'Type with code ' + req.params.code + ' not found.'
                });
            }
            res.send(x);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Type with code ' + req.params.code + ' not found.'
                });
            }
            return res.status(500).send({
                message: err.message,
                stacktrace: err.stacktrace
            });
        });
});

// exports
module.exports = router;
