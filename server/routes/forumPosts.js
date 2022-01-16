var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/forumPosts
router.get('/', (req, res) =>{
    var filters = [];
    if (req.query.idCategory !== undefined) {
        filters.push({
            idCategory: req.query.idCategory
        });
    }
    if (req.query.idCreator !== undefined) {
        filters.push({
            idCreator: req.query.idCreator
        });
    }
    if (req.query.title !== undefined) {
        filters.push({
            title: req.query.title
        });
    }
    if (req.query.description !== undefined) {
        filters.push({
            description: req.query.description
        });
    }
    db.ForumPosts.findAll({
        attributes: ['id', 'image', 'description', 'idCreator', 'title', 'idCategory', 'createdAt', 'updatedAt'],
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'author'
          },
          {
            attributes: [
                'name'
            ],
            model: db.HelpCategory,
            required: true,
            as: 'category'
          }
        ],
        where: {
            [Op.and]: filters
        }
        // where: { idHelp: req.query.idHelp }
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
});

// GET /api/forumPosts/5
router.get('/:id', (req, res) =>
    db.ForumPosts.findByPk(req.params.id, {
        attributes: ['image', 'description', 'idCreator', 'title', 'idCategory', 'createdAt'],
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'author'
          },
          {
            attributes: [
                'name'
            ],
            model: db.HelpCategory,
            required: true,
            as: 'category'
          }
        ]
    })
    .then(x => {
        res.json(x)
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
    })
);

// POST /api/forumPosts/add
router.post('/add', (req, res) => {
  const body = req.body;
  console.log('---- body ----')
  console.log('--------------')
  console.log(body)
  console.log('--------------')
  console.log('--------------')
  if (body == undefined) {
      res.sendStatus(400)
  } else if (body.idCategory === undefined) {
      res.status(400).send({ message: 'idCategory is missing' });
  } else if (body.idCreator === undefined) {
      res.status(400).send({ message: 'idCreator is missing' });
  } else if (body.title === undefined) {
      res.status(400).send({ message: 'title is missing' });
  } else if (body.description === undefined) {
      res.status(400).send({ message: 'description is missing' });
  } else {
      db.ForumPosts.create({
          idCategory: body.idCategory,
          idCreator: body.idCreator,
          title: body.title,
          description: body.description,
          image: body.image
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

// DELETE /api/forumPosts/delete/id
router.delete('/delete/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.ForumPosts.findByPk(req.params.id)
          .then(function (forumPosts) {
              // Check if record exists in db
              if (forumPosts) {
                forumPosts.destroy()
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

// PUT /api/forumPosts/update/id
router.put('/update/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.ForumPosts.findByPk(req.params.id)
          .then(function (forumPosts) {
              // Check if record exists in db
              if (forumPosts) {
                forumPosts.update({
                      description: body.description,
                      idCategory: body.idCategory,
                      image: body.image
                  })
                      .then(x => {
                          res.status(200).send(forumPosts)
                      })
              }
          })
  }
});


// exports
module.exports = router;
