// Install express server
const express = require('express');
const path = require('path');

const app = express();

/*
process.argv[process.argv.lastIndexOf()] (function (val, index, array) {
  console.log(index + ': ' + val);
});
*/

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/rehelp-web'));

app.get('/api/test', function (req, res) {
  res.send({ greet: 'Hi Jongen!'});
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/rehelp-web/index.html'));
});

// Start the app by listening on the default Heroku port
let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('ReHelp web app working => http://localhost:' + port);
});