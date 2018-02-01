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
    }
});
// Adds all methods and fields for authentication to schema
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// Change errors from ugly to nice (for users!)
userSchema.plugin(mongodbErrorHandler);

mondule.exports = mongoose.model('User', userSchema);