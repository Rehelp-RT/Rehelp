const router = require('express').Router();

router.use('/', require('./basic'));
router.use('/categories', require('./categories'));
router.use('/feedback', require('./feedback'));
router.use('/helps', require('./helps'));
router.use('/responses', require('./responses'));
router.use('/users', require('./users'));

router.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

// exports
module.exports = router;