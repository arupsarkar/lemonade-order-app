const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require("express-session");
const path = require('path');
const app = express();
const port = process.env.PORT || '3000';
const server = require('http').Server(app);

// Enable CORS
app.use(cors());
app.options('*', cors()); // include before other routes
// Initialize session
app.use(session(
  {
    secret: 'S3CRE7',
    resave: true,
    saveUninitialized: true
  }
));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/dist/lemonade-order-app'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/lemonade-order-app/index.html'));
});

server.listen(port, () => console.log(`API running on localhost:${port}`));

