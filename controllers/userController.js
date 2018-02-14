const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
// const multer = require('multer');
// const jimp = require('jimp');
// const uuid = require('uuid');
promisify.Promise = require("bluebird");


exports.loginForm = (req, res) => {
    res.render('login')
};

exports.registerForm = (req,res) => {
    res.render('register', {title: 'Register'});
};

exports.validateRegistration = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
    // possible to remove client side required check, so checking server-side as well
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('passwordConfirm', 'Please enter confirmed password').notEmpty();
    req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);
    // TO DO add client side error notifications
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ 
        email: req.body.email ,
        name: req.body.name
    });
    //  Convenience method from pass-local-mongoose to register a new user instance with a given password. Checks if username is unique
    // If method lives on an object (in this case User) must pass entire object so it knows where to bind it to 
    const registerWithPromise = promisify(User.register, User);
    // Takes email, name and stores password as hash
    await registerWithPromise(user, req.body.password);
    next();
};

exports.account = (req, res) => {
    res.render('account', {title: 'Edit Account'});
}

exports.updateAccount = async (req, res) => {
    const updated = {
        name: req.body.name,
        email: req.body.email
    };
    const user = await User.findOneAndUpdate(
        // query
        { _id: req.user.id},
        // Take updated and set it on top of what already exists
        { $set: updated},
        // Return new user, run validation steps, query is required to do it properly 
        { new: true, runValidators: true, context: 'query'}
    );
    res.redirect('back');
};

exports.friends = (req, res) => {
    res.render('friends');
};

exports.addFriend = async (req, res) => {
    const nameToSearch = req.body.name;
    const friend = await User.find(
        {name: nameToSearch},
    );
    res.json(friend);
};

// Keeping these as an option for this project. I might still incorporate this

// Where file will be stored when uploaded and what type of files are allowed
// const multerOptions = {
//     // read image to memory for resizing.
//     storage: multer.memoryStorage(),
//     fileFilter: function (req, file, next) {
//         const isPhoto = file.mimetype.startsWith('image/');
//         if(isPhoto){
//             // if it starts with image, it's fine. continue with file upload
//             next(null, true);
//         } else {
//             next({ message: 'That filetype isn\'t allowed!'}, false);
//         }
//     }
// };
// exports.upload = multer(multerOptions).single('photo');
// stores to memory of server (temporary)
// exports.resize = async (req, res, next) => {
//     // check if there is a new file to resize
//     if( !req.file ){
//         next(); // skip to next middleware
//     }
//     const fileExtension = req.file.mimetype.split('/')[1];
//     // pass info to req.body gathering saved to req.body
//     req.body.photo = `${uuid.v4()}.${fileExtension}`; 
//     // resize
//     const photo = await jimp.read(req.file.buffer);
//     await photo.resize(400, jimp.AUTO);
//     await photo.write(`./public/uploads/${req.body.photo}`);
//     // once saved to filesystem, continue.
//     next();
// }

