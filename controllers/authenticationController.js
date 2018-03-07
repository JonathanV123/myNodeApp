const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const sgMail = require('@sendgrid/mail');

exports.login = passport.authenticate('local',{
    failureRedirect: '/login',
    failureFlash: 'Account does not exist, or account name and password were incorrect',
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
        req.flash('error', 'User does not exist');
        return res.redirect('/login');
    }
    // 2. Reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // 3. Send an email  local host now but when deployed, domain name
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: `${user.email}.com`,
        from: 'watchy@example.com',
        subject: 'Password Reset',
        text: 'Texting what this text thing does',
        html: `<strong>Click the link or copy and paste it to your address bar to reset your password</strong> <p>${resetURL}</p>`,
    };
    // 4. Redirect to reset
    sgMail.send(msg)
    req.flash('success', "Password reset has been sent")
    res.redirect('/login');
};

exports.reset = async (req, res) => {
    const user = await User.findOne({  
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });
    if (!user){
        req.flash('error', "Password has expired, or no user found")
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
    const user = await User.findOne({  
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() }
    });
    if (!user){
        req.flash('error', "Your password had expired. Please try again");
        return res.redirect('/login');
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    const updatedUser = await user.save();
    await req.login(updatedUser);
    req.flash('success', "Your password has been reset")
    res.redirect('/login');
};