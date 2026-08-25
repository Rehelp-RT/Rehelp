/*--- Requires ---*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const api = require('./routes');
const { Server } = require('socket.io');
const db = require('./models');
var CodiceFiscale = require('codice-fiscale-js');
const CodiceFiscaleUtils = require('@marketto/codice-fiscale-utils');


/*--- Setup ---*/

// start Express
const app = express();

// setup CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// setup parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cors = require('cors')

// setup client for production
const clientPath = path.join(__dirname, '../public')
app.use(express.static(clientPath));


// setup stripe


app.use(cors())

app.post('/checkout', async (req, res) =>{

  try {
    token = req.body.token;
    console.log(token.id);
    const customer = stripe.customers
      .create({
        email: req.body.email,
        source: token.id
      })
      .then((customer) => {
        //console.log(customer);
        return stripe.charges.create({
          amount: req.body.amount,
          description: "Donazione effettuata da ReHelp",
          currency: "EUR",
          customer: customer.id,
        });
      })
      .then((charge) => {
        // console.log(charge);
        res.json({
          data:"success"
        })
      })
      .catch((err) => {
        res.json({
          data: "failure",
        });
      });
    return true;
  } catch (error) {
    return false;
  }
})


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
let io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
io.on('connection', (socket) => {

  socket.on('new-message', (message) => {
    // message received
    console.log('message received:', message);

    // check format
    if (message.idHelp === undefined) {
      console.error('idHelp is missing:', message);
    } else if (message.idAuthor === undefined) {
      console.error('idAuthor is missing:', message);
    } else if (!message.body && !message.imageUrl) {
      console.error('body or imageUrl is required:', message);
    } else {
      // assign a date
      const currentDate = new Date();
      message.createdAt = currentDate;

      // save it
      db.Message.create({
        idHelp: message.idHelp,
        idResponse: message.idResponse || null,
        idAuthor: message.idAuthor,
        body: message.body || null,
        imageUrl: message.imageUrl || null,
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
