const mongoose = require('mongoose');
const PlaceToVisit = mongoose.model('PlaceToVisit');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

// Where file will be stored when uploaded and what type of files are allowed
const multerOptions = {
    // read image to memory for resizing.
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            // if it starts with image, it's fine. continue with file upload
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!'}, false);
        }
    }
};

exports.homePage = (req, res) => {
    res.render('layout')
};

exports.addGathering = (req, res) => {
    res.render('editPlace', {
        title: 'Add Gathering'
    })
};
// stores to memory of server (temporary)
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check if there is a new file to resize
    if( !req.file ){
        next(); // skip to next middleware
    }
    const fileExtension = req.file.mimetype.split('/')[1];
    // pass info to req.body gathering saved to req.body
    req.body.photo = `${uuid.v4()}.${fileExtension}`; 
    // resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads${req.body.photo}`);
    // once saved to filesystem, continue.
    next();
}

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
    // set the location data to be a point 
    req.body.location.type = 'Point';
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

exports.getGatheringBySlug = async (req, res, next) => {
    // check params
    // res.json(req.params);
    const gathering = await PlaceToVisit.findOne({ slug: req.params.slug });
    // all data of gathering (check if query is working)
    // res.json(gathering);
    // --------------------
    // if a query in mongoDB doesn't find anything, not an errow will just return null
    // if no gathering add 404 TODO
    if( !gathering ){
        return next();
    }
    res.render('gathering', {gathering, title: gathering.name});
};