// install express server
const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');

// start Express framework
const app = express();
const api = require('./routes/api');

// static files where Angular is located
const clientPath = path.join(__dirname, '../public')
app.use(express.static(clientPath));

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
app.use('/api', api);

// client
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, '/index.html'));
});

// start the app by listening on the default Heroku port
let port = process.env.PORT || 3000;
app.listen(port, function () {
  if (process.env.MODE != 'production') {
    console.log(`ReHelp API running on http://localhost:${port}`);
  }
});
