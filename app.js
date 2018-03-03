const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const helpers = require('./helpers');
const flash = require('connect-flash');
const passport = require('passport');
const expressValidator = require('express-validator');
const promisify = require('es6-promisify');
const cookieParser = require('cookie-parser')
const routes = require('./routes/index');
const errorHandlers = require('./errorHandler/errorHandling');
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

app.use(cookieParser()) // required before session.

app.use(session({
     secret: 'dogsRule',
     key: process.env.KEY,
     // Only save session after each request when something changes
     resave: false,
     saveUninitialized: false,
     store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Client will only store session id
// The session itself is stored on the server or db
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.helpers = helpers;
    res.locals.flashes = req.flash();
    // req.user available because of passport
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes);

app.use(errorHandlers.notFound);



// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);
module.exports = app;