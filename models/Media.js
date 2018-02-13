const mongoose = require('mongoose');
// Use built in ES6 promise
mongoose.Promise = global.Promise;
// Allows URL friendly names for slugs
const slug = require('slugs');

const media = new mongoose.Schema({
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
media.index({
    name: 'text',
});

// mediaSchema.statics.getTags = function(){
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



module.exports = mongoose.model('Media', media);
