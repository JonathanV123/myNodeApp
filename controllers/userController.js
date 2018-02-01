const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
    res.render('login')
};

exports.registerForm = (req,res) => {
    res.render('register', {title: 'Register'});
};

exports.validateRegistration = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
    // possible to remove client side required check, so checking server-side as well
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Passwords do not match').equals(req.body.password);
    // TO DO add client side error notifications
    next();
};