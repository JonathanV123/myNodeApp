const passport = require('passport');

exports.login = passport.authenticate('local',{
    failureRedirct: '/login',
    failureFlash: 'Failed Login',
    successRedirect: '/',
    // successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
    req.logout();
    // TO DO add notifications to user logged out!
    res.redirect('/');
};

