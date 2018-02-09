const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers');
const flash = require('connect-flash');
const passport = require('passport');
const expressValidator = require('express-validator');
const promisify = require('es6-promisify');
const cookieParser = require('cookie-parser')
const routes = require('./routes/index');
require('./passport');

const app = express();
// Where we keep our pug files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

// Takes form information from req and turns it into usable properties on body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data (body params or query)
app.use(expressValidator());

// The flash middleware let's us use req.flash
// app.use(flash());

// promisify some callback based APIs
app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
  });

app.use(cookieParser()) // required before session.
app.use(session({
     secret: 'dogsRule',
     // Only save session after each request when something changes
     resave: false,
     // If true
     saveUninitialized: false,
}));

// Client will only store session id
// The session itself is stored on the server or db
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.helpers = helpers;
    // req.user available because of passport
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});


app.use('/', routes);

module.exports = app;