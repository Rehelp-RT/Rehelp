// Install express server
const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');

const app = express();

// static files
app.use(express.static(__dirname + '/dist/rehelp-web'));

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

// API
app.get('/api/test', function (req, res) {
  res.send({ greet: 'Hi Jongen!'});
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