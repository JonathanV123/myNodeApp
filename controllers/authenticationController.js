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

exports.checkIfLoggedIn = (req, res, next) => {
    // check if user is authenticated
    if(req.isAuthenticated()){
        next();
        return
    }
    // TO DO notification of login in or register
    res.redirect('/');
};

