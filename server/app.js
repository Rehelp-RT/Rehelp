/*--- Requires ---*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');
const api = require('./routes');


/*--- Setup ---*/

// start Express
const app = express();

// setup client
const clientPath = path.join(__dirname, '../public')
app.use(express.static(clientPath));

// setup parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var credentials = {};
if (process.env.NODE_ENV !== 'production') {
    const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
    const certificate = fs.readFileSync('ssl/server.crt', 'utf8');
    credentials = {
        key: privateKey,
        cert: certificate
    };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}



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
    `rehelp.app:${port}` :
    `localhost:4200`

https.createServer(credentials, app)
    .listen(port, function() {
        if (process.env.MODE != 'production') {
            console.log(
                `ReHelp running on https://${host}/api/version\nReHelp App running on https://${host}`);
        }
    });