const mongoose = require('mongoose');
// Use built in ES6 promise
mongoose.Promise = global.Promise;
// Allows URL friendly names for slugs
const slug = require('slugs');

const placeToVisitSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a gathering name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    date: String,
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: String,
            required: 'You must supply an address!'
        }
    },
    photo: String
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