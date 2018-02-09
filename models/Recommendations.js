const mongoose = require('mongoose');
// Use built in ES6 promise
mongoose.Promise = global.Promise;
// Allows URL friendly names for slugs
const slug = require('slugs');

const recommendations = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a Show name!'
    },
    slug: String,
    tags: [String],
    date: {
         type: Date,
         default: Date.now()
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author',
    }
});

// Indexes (Indexed as text so you can perform a search on anything that is text)
recommendations.index({
    name: 'text',
    description: 'text'
});

// Before saving auto generate slug field (Only runs when name is changed)
recommendations.pre('save', async function (next) {
    // If name is not modified
    if (!this.isModified('name')) {
        next(); //skip
        return; //stop
    }
    this.slug = slug(this.name);
    // find other gatherings with same slug
    // Whew regex can be a pain... (For Future Reference)
    // 1. ^(${this.slug}) search for URLs with this.slug
    // 2. (--[0-9]*$)?)$ $ sign is ends with one of two things
    // 3. a dash - or 0-9 so gathering-1 gathering-2 q mark ? means optional
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    // Can't access model inside model function because it has not saved
    // In this case this.constructor will be equal to Recommendations by the time it runs
    const gatheringsWithSlug = await this.constructor.find({ slug: slugRegEx });
    if(gatheringsWithSlug.length){
        this.slug = `${this.slug}-${gatheringsWithSlug.length + 1}`;
    }
    next();
});

// recommendations.statics.getTags = function(){
//     // return array of possible items we are looking for
//     // Essentially piping through each one. Unwind then group with count then sort
//     return this.aggregate([
//         // gets single tag for each gathering (duplicates each gathering with a single tag)
//         { $unwind: '$tags' },
//         // gives us an array filled with objects with _id: being tag name and count being how many instances 
//         { $group: { _id: '$tags', count: { $sum: 1 }}},
//         // sort the list of tags based on count (high to low)
//         { $sort: {count: -1} }       
//     ]);
// };

module.exports = mongoose.model('Recommendations', recommendations);