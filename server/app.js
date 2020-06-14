/*--- Requires ---*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const api = require('./routes');
const socketIO = require('socket.io');
const db = require('./models');


/*--- Setup ---*/

// start Express
const app = express();

// setup client for production
const clientPath = path.join(__dirname, '../public')
app.use(express.static(clientPath));

// setup parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// setup certificates
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

// setup server
const port = process.env.PORT || 3000;
const server =
    (process.env.NODE_ENV === 'production') ?
    http.Server(app) :
    https.createServer(credentials, app);

// setup socket.io
let io = socketIO(server);
io.on('connection', (socket) => {

    socket.on('new-message', (message) => {
        // message received
        console.log('message received:', message);

        // check format
        if (message.idResponse === undefined) {
            console.error('idResponse is missing:', message);
        } else if (message.idAuthor === undefined) {
            console.error('idAuthor is missing:', message);
        } else if (message.body === undefined) {
            console.error('body is missing:', message);
        } else {
            // assign a date
            const currentDate = new Date();
            message.createdAt = currentDate;

            // save it
            db.Message.create({
                idResponse: message.idResponse,
                idAuthor: message.idAuthor,
                body: message.body,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt
            })
            .then(x => {
                // send it to all users
                socket.emit('new-message', x);
                socket.broadcast.emit('new-message', x);
            })
            .catch(err => {
                 console.error('saving error:', err);
            });
        }
    });

    socket.on('disconnect', () => {
        // user disconnect
        console.log('Disconnected');
    })

});



/*--- Routes ---*/

// API routes
app.use('/api', api);

// client routes
app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, '/index.html'));
});



/*--- Start ---*/

server.listen(port, function() {
    const appUrl = (process.env.MODE === 'production') ? 'rehelp.app' : `localhost:${port}`;
    console.log(`ReHelp API running on https://${appUrl}/api/version`);
    console.log(`ReHelp Web App running on https://${appUrl}`);
});