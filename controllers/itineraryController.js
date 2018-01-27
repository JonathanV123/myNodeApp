const mongoose = require('mongoose');
const PlaceToVisit = mongoose.model('PlaceToVisit');

exports.homePage = (req, res) => {
    res.render('layout')
};

exports.addGathering = (req, res) => {
    res.render('editPlace', {
        title: 'Add Store'
    })
};

exports.createGathering = async (req, res) => {
    const gathering = new PlaceToVisit(req.body);
    await gathering.save();
    res.redirect('/');
};

exports.landingPage = (req, res) => {
    res.render('landing', {
        title: 'Add Store'
    })
};