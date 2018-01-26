const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');


const app = express();
// Where we keep our pug files
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

module.exports = app;
