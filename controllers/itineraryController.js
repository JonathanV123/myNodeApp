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
    res.redirect(`/gathering/${gathering.slug}`);
};
exports.getGatherings = async (req, res) => {
    // query database for gatherings
    const gatherings = await PlaceToVisit.find();
    res.render('gatherings', { title: 'Gatherings', gatherings: gatherings});
}
exports.landingPage = (req, res) => {
    res.render('landing', {
        title: 'Add Store'
    })
};