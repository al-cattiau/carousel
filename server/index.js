// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
app.use(express.static(path.resolve(__dirname,'../build')));

// DB Setup
mongoose.connect('mongodb://localhost/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);
//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);