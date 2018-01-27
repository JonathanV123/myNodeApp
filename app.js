const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers');
const routes = require('./routes/index');


const app = express();
// Where we keep our pug files
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

// Takes form information from req and turns it into usable properties on body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.locals.helpers = helpers;
    next();
});

app.use('/', routes);

module.exports = app;