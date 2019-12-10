/*--- Requires ---*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes/api');
const db = require('./config/database');



/*--- Setup ---*/

// start Express
const app = express();

// test DB
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// setup client
const clientPath = path.join(__dirname, '../public')
app.use(express.static(clientPath));

// setup parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



/*--- Routes ---*/

// API routes
app.use('/api', api);

// client routes
app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, '/index.html'));
});



/*--- Start ---*/

// start the app
const port = process.env.PORT || 3000;
const host =
    process.env.MODE == 'production' ?
    `birrific.io:${port}` :
    `localhost:4200`
app.listen(port, function() {
    if (process.env.MODE != 'production') {
        console.log(
            `ReHelp running on http://${host}/api\nReHelp App running on http://${host}`);
    }
});