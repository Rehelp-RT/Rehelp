// install express server
const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');

// start Express framework
const app = express();

// static files where Angular is located
app.use(express.static(__dirname + '/../dist/rehelp-web'));

// database
const sequelize = new Sequelize('postgres://postgres:mucca@localhost:5432/rehelp');

// test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// model
const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  // options
});

// API

app.get('/api/test', function(req, res) {
  res.send({ greet: 'Hi Jongen!'});
});

app.get('/api/users', function(req, res) {
  // find all users
  User.findAll().then(users => {
    res.send(JSON.stringify(users, null, 4));
  });
});

app.post('/api/user', function(req, res) {
  // create a new user
  User.create({ firstName: "Jane", lastName: "Doe" }).then(user => {
    res.send({id: user.id});
  });
});

app.delete('/api/user', function(req, res) {
  // delete everyone named "Jane"
  User.destroy({
    where: {
      firstName: "Jane"
    }
  }).then(() => {
    res.send({id: user.id});
  });
});

app.put('/api/user', function(req, res) {
  // change everyone without a last name to "Doe"
  User.update({ lastName: "Doe" }, {
    where: {
      lastName: null
    }
  }).then(() => {
    res.send({id: user.id});
  });
});

// client

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/rehelp-web/index.html'));
});

// start the app by listening on the default Heroku port
let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('ReHelp web app working => http://localhost:' + port);
});