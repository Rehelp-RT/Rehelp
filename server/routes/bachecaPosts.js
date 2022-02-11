var router = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');

// GET /api/bachecaPosts
router.get('/', (req, res) =>{
    var filters = [];
    if (req.query.idHelp !== undefined) {
        filters.push({
          idHelp: req.query.idHelp
        });
    }
    if (req.query.idCreator !== undefined) {
        filters.push({
            idCreator: req.query.idCreator
        });
    }
    if (req.query.idResponder !== undefined) {
        filters.push({
          idResponder: req.query.idResponder
        });
    }
    if (req.query.description !== undefined) {
        filters.push({
            description: req.query.description
        });
    }
    db.BachecaPosts.findAll({
        attributes: ['id', 'image', 'description', 'idCreator', 'idResponder', 'idHelp', 'createdAt', 'updatedAt'],
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude', 'cf', 'donator',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'author'
          },
          {
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude', 'cf', 'donator',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'responder'
          },
          {
            attributes: [
                'id', 'description'
            ],
            
            model: db.Help,
            required: true,
            as: 'help',
            include: [
              {
                attributes: [
                    'name', 'image'
                ],
                model: db.HelpCategory,
                required: true,
                as: 'category'
              }
            ],
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

// GET /api/bachecaPosts/5
router.get('/:id', (req, res) =>
    db.BachecaPosts.findByPk(req.params.id, {
      attributes: ['id', 'image', 'description', 'idCreator', 'idResponder', 'idHelp', 'createdAt', 'updatedAt'],
        include: [{
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude', 'cf', 'donator',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'author'
          },
          {
            attributes: [
                'id', 'avatar', 'birthdate', 'city', 'country',
                'email', 'firstname', 'lastname', 'latitude', 'longitude', 'cf', 'donator',
                'likehelps', 'loginLocal', 'loginFacebook', 'loginGoogle',
                'idFacebook', 'idGoogle', 'phoneNumber'
            ],
            model: db.User,
            required: true,
            as: 'responder'
          },
          {
            attributes: [
                'id', 'description'
            ],
            model: db.Help,
            required: true,
            as: 'help'
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

// POST /api/bachecaPosts/add
router.post('/add', (req, res) => {
  const body = req.body;
  console.log('---- body ----')
  console.log('--------------')
  console.log(body)
  console.log('--------------')
  console.log('--------------')
  if (body == undefined) {
      res.sendStatus(400)
  } else if (body.idHelp === undefined) {
      res.status(400).send({ message: 'idHelp is missing' });
  } else if (body.idCreator === undefined) {
      res.status(400).send({ message: 'idCreator is missing' });
  } else if (body.idResponder === undefined) {
      res.status(400).send({ message: 'idResponder is missing' });
  } else if (body.description === undefined) {
      res.status(400).send({ message: 'description is missing' });
  } else {
      db.BachecaPosts.create({
          idHelp: body.idHelp,
          idCreator: body.idCreator,
          idResponder: body.idResponder,
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

// DELETE /api/bachecaPosts/delete/id
router.delete('/delete/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.BachecaPosts.findByPk(req.params.id)
          .then(function (bachecaPosts) {
              // Check if record exists in db
              if (bachecaPosts) {
                bachecaPosts.destroy()
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

// PUT /api/bachecaPosts/update/id
router.put('/update/:id', (req, res) => {
  const body = req.body;
  if (body == undefined) {
      res.sendStatus(400)
  } else {
      db.BachecaPosts.findByPk(req.params.id)
          .then(function (bachecaPosts) {
              // Check if record exists in db
              if (bachecaPosts) {
                bachecaPosts.update({
                      description: body.description,
                      image: body.image
                  })
                      .then(x => {
                          res.status(200).send(bachecaPosts)
                      })
              }
          })
  }
});


// exports
module.exports = router;
