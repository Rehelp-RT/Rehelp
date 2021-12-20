const router = require('express').Router();

router.use('/', require('./basic'));
router.use('/categories', require('./categories'));
router.use('/helps', require('./helps'));
router.use('/messages', require('./messages'));
router.use('/notifications', require('./notifications'));
router.use('/responses', require('./responses'));
router.use('/users', require('./users'));
router.use('/trades', require('./trades'));
router.use('/types', require('./types'));
router.use('/comments', require('./comments'));
router.use('/forumPosts', require('./forumPosts'));

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
