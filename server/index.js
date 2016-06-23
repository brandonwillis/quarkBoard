const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:auth/auth');

app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
router(app);

const port = process.env.PORT || 8200;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
