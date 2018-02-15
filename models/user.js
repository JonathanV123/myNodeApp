const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate:[validator.isEmail, 'Invalid Email Address'],
        required: 'Please Provide an email address'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true,
    },
    myShows: {
        watchingNow: [{
            name: String,
            tags: [String],
        }],
        recommendations: [{
            name: String,
            tags: [String],
        }],
        mustWatch: [{
            name: String,
            tags: [String],
        }],
    },
    friends:{
        pending:[],
        friends:[]
    },
//    photo: String,
   resetPasswordToken: String,
   resetPasswordTokenExpires: Date
});
// Adds all methods and fields for authentication to schema
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// Change errors from ugly to nice (for users!)
userSchema.plugin(mongodbErrorHandler);

// userSchema.statics.getWatchingNow = function(){
//     //     return array of possible items we are looking for
//     //     // Essentially piping through each one. Unwind then group with count then sort
//         return this.aggregate([
//             // gets single tag for each gathering (duplicates each gathering with a single tag)
//             { $unwind: '$watchingNow' },
//             // gives us an array filled with objects with _id: being tag name and count being how many instances 
//             { $group: { _id: '$watchingNow', count: { $sum: 1 }}},
//             // sort the list of tags based on count (high to low)
//             { $sort: {count: -1} }       
//         ]);
//     };

module.exports = mongoose.model('User', userSchema);