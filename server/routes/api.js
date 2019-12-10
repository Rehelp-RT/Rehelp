const express = require('express');
const router = express.Router();

// GET /api/version
router.get('/version', function(req, res) {
  res.send({ version: 'v0.1.0'});
});

// GET /api/users
router.get('/users', function(req, res) {
  User.findAll().then(users => {
    res.send(JSON.stringify(users, null, 4));
  });
});

// POST /api/user
router.post('/user', function(req, res) {
  User.create({ firstName: "Jane", lastName: "Doe" }).then(user => {
    res.send({id: user.id});
  });
});

// DELETE /api/user
router.delete('/user', function(req, res) {
  User.destroy({
    where: {
      firstName: "Jane"
    }
  }).then(() => {
    res.send({id: user.id});
  });
});

// PUT /api/user
router.put('/user', function(req, res) {
  User.update({ lastName: "Doe" }, {
    where: {
      lastName: null
    }
  }).then(() => {
    res.send({id: user.id});
  });
});

// exports
module.exports = router;
