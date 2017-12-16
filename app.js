const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/testRoute');




const app = express();
// app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
// app.set('view engine', 'pug')

app.use('/', routes);

module.exports = app;
