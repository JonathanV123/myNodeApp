const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

// Generates a function that Passport uses to serialize users into session
passport.serializeUser(User.serializeUser());
// Generates a function that Passport uses to deserialize users into session
passport.deserializeUser(User.serializeUser());