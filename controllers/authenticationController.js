const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../mail');

exports.login = passport.authenticate('local',{
    failureRedirect: '/login',
    failureFlash: 'Account Does Not Exist',
    successRedirect: '/userHome',
    // successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
    req.logout();
    // TO DO add notifications to user logged out!
    res.redirect('/');
};

exports.checkIfLoggedIn = (req, res, next) => {
    // check if user is authenticated
    if(req.isAuthenticated()){
        next();
        return
    }
    req.flash('error', 'You must be logged in to do that!');
    res.redirect('/login');
};

exports.forgotPassword = async (req, res) => {
    // 1. See if user exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        console.log('User does not exist');
        return res.redirect('/login');
    }
    // 2. Reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // 3. Send an email  local host now but when deployed, domain name
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        user,
        subject: 'Password Reset',
        resetURL,
        // We we render html it will look for password-reset.pug
        filename: 'password-reset',
    })
    // 4. Redirect to reset
    res.render('login');
};

exports.reset = async (req, res) => {
    const user = await User.findOne({  
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });
    console.log(user);
    if (!user){
        console.log('Password has expired or No user found');
        return res.redirect('/login');
    }
    // if there is a user, show the reset password form
    res.render('reset', { title: 'Reset your Password' });
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']){
        next();
        return;
    }
    console.log('TODO password do not match notifcation');
};

exports.update = async (req, res) => {
    console.log('UPDATE RUNNING');
    const user = await User.findOne({  
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });
    if (!user){
        console.log('Password has expired');
        return res.redirect('/login');
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    const updatedUser = await user.save();
    await req.login(updatedUser);
    console.log('Password has been reset success');
};