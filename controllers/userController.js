const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
promisify.Promise = require("bluebird");


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
    req.checkBody('passwordConfirm', 'Please enter confirmed password').notEmpty();
    req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);
    // TO DO add client side error notifications
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ 
        email: req.body.email ,
        name: req.body.name
    });
    //  Convenience method from pass-local-mongoose to register a new user instance with a given password. Checks if username is unique
    // If method lives on an object (in this case User) must pass entire object so it knows where to bind it to 
    const registerWithPromise = promisify(User.register, User);
    // Takes email, name and stores password as hash
    await registerWithPromise(user, req.body.password);
    next();
};

exports.account = (req, res) => {
    res.render('account', {title: 'Edit Account'});
}

exports.updateAccount = async (req, res) => {
    const updated = {
        name: req.body.name,
        email: req.body.email
    };
    const user = await User.findOneAndUpdate(
        // query
        { _id: req.user.id},
        // Take updated and set it on top of what already exists
        { $set: updated},
        // Return new user, run validation steps, query is required to do it properly 
        { new: true, runValidators: true, context: 'query'}
    );
    res.redirect('back');
};