const mongoose = require('mongoose');
// Use built in ES6 promise
mongoose.Promise = global.Promise;
// Allows URL friendly names for slugs
const slug = require('slugs');

const placeToVisitSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a place to visit!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    tags: [String]
});

// Before saving auto generate slug field (Only runs when name is changed)
placeToVisitSchema.pre('save', function (next) {
    // If name is not modified
    if (!this.isModified('name')) {
        next(); //skip
        return; //stop
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('PlaceToVisit', placeToVisitSchema);