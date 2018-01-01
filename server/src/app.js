const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/routes');
const env = require('node-env-file');

// Init custom env variables
env(path.join(__dirname, '/../', '.env'));

const app = express();

console.log(`Starting server from ${__dirname} ...`);

// Parsers
app.use(bodyParser.json());

// CORS Configuration to allow cross domains, to set BEFORE API routing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    // simple logger for this router's requests
    console.log(`${req.method} ${req.url} ${req.path}`);
    next();
});

// **** Middleware : Logger congiguration ****
const logDirectory = path.join(__dirname, '/../', 'log');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) { fs.mkdirSync(logDirectory); }

// create a rotating write stream
const accessLogStream = rfs('access.log', {
 interval: '1d', // rotate daily
 path: logDirectory
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// **** Middleware : Security Configuration ****
app.use(helmet());

// API location
routes(app);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;
