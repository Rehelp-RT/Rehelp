var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');


// GET /api/comments?idHelp=4
router.get('/', (req, res) => {
    var filters = [];
    if (req.query.idHelp !== undefined) {
        filters.push({
            idHelp: req.query.idHelp
        });
    }
    else if (req.query.idPost !== undefined) {
        filters.push({
            idPost: req.query.idPost
        });
    }
    db.Comments.findAll({
        attributes: ['id', 'message', 'idCreator', 'createdAt','updatedAt', 'idHelp', 'idPost'],
        
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country', 'cf', 'donator',
                'email', 'firstname', 'lastname', 'latitude', 'longitude',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],

            model: db.User,
            required: true,
            as: 'author'
        }],
        where: {
            [Op.and]: filters
        },
        // where: { [attribute]: value }
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

// GET /api/comments/5
router.get('/:id', (req, res) =>
    db.Comments.findByPk(req.params.id, {
      attributes: ['message', 'idCreator', 'createdAt', 'idHelp', 'idPost'],
      include: [{
          attributes: [
              'id', 'avatar', 'birthdate', 'city', 'country', 'cf', 'donator',
              'email', 'firstname', 'lastname', 'latitude', 'longitude',
              'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
              'idFacebook', 'idGoogle', 'phoneNumber'
          ],

          model: db.User,
          required: true,
          as: 'author'
      }],
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
);

// POST /api/comments/add
router.post('/add', (req, res) => {
  const body = req.body;

  console.log('---- body ----')
  console.log('--------------')
  console.log(body)
  console.log('--------------')
  console.log('--------------')
  if (body == undefined) {
      res.sendStatus(400)
  } else if (body.idHelp === undefined && body.idPost === undefined) {
      res.status(400).send({ message: 'idHelp or idPost is missing' });
  } else if (body.idCreator === undefined) {
      res.status(400).send({ message: 'idCreator is missing' });
  } else if (body.message === undefined) {
      res.status(400).send({ message: 'message is missing' });
  } else {
      db.Comments.create({
          idPost: body.idPost,
          idHelp: body.idHelp,
          idCreator: body.idCreator,
          message: body.message
      })
        .then(x => {
          res.json(x)
        })
        .catch(err => {
          console.error(err);
          res.status(500).send(err.message)
      });
  }
});

// DELETE /api/comments/delete/id
router.delete('/delete/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.Comments.findByPk(req.params.id)
          .then(function (comment) {
              // Check if record exists in db
              if (comment) {
                comment.destroy()
                      .then(x => {
                          res.status(200).send(x);
                      })
              }
          })
          .catch(err => {
              res.status(500).send(err);
          });

  }
});

// PUT /api/comments/update/id
router.put('/update/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.Comments.findByPk(req.params.id)
          .then(function (comment) {
              // Check if record exists in db
              if (comment) {
                comment.update({
                      message: body.message
                  })
                      .then(x => {
                          res.status(200).send(comment)
                      })
              }
          })
  }
});


// exports
module.exports = router;
