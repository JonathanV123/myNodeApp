const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Creates a configured passport-local LocalStrategy instance that can be used in passport.
passport.use(User.createStrategy());
// What passport does with user when they are logged in
// Generates a function that Passport uses to serialize users into session
passport.serializeUser(User.serializeUser());
// Generates a function that Passport uses to deserialize users into session
passport.deserializeUser(User.deserializeUser());