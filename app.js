const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers');
const flash = require('connect-flash');
const passport = require('passport');
const expressValidator = require('express-validator');
const promisify = require('es6-promisify');
const routes = require('./routes/index');
require('./passport');

const app = express();
// Where we keep our pug files
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

// Takes form information from req and turns it into usable properties on body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data (body params or query)
app.use(expressValidator());

// The flash middleware let's us use req.flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.helpers = helpers;
    next();
});

app.use('/', routes);

module.exports = app;