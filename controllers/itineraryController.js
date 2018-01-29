const mongoose = require('mongoose');
const PlaceToVisit = mongoose.model('PlaceToVisit');

exports.homePage = (req, res) => {
    res.render('layout')
};

exports.addGathering = (req, res) => {
    res.render('editPlace', {
        title: 'Add Gathering'
    })
    res.redirect(`/gatherings`);
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
exports.editGathering = async (req, res) => {
    // 1. Find the gathering given the ID
    const gathering = await PlaceToVisit.findOne({ _id: req.params.id});
    // 2. Confirm they are gathering owner
    // TODO 
    // 3. Render edit form 
    res.render('editPlace', {title: `Edit ${gathering.name}`, gathering: gathering})

}

exports.updateGathering = async (req, res) => {
    const gathering = await PlaceToVisit.findOneAndUpdate({ _id: req.params.id}, req.body,
        {
        new: true, //return the new gathering instead of old one
        runValidators: true,
    }).exec();
    res.redirect(`/gatherings/${gathering._id}/edit`);
};
exports.landingPage = (req, res) => {
    res.render('landing', {
        title: 'Add Store'
    })
};