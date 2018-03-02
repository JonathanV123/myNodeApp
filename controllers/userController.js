const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
// const multer = require('multer');
// const jimp = require('jimp');
// const uuid = require('uuid');
// promisify.Promise = require("bluebird");


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
    await req.login(user);
    req.flash('success', "Successfully Updated Account Settings");
    res.redirect('/account');
};

exports.friends = (req, res) => {
    res.render('friends');
};

exports.addFriend = async (req, res) => {
    const recipientEmail = req.body.email
    // Get friend you are searching for
    const friend = await User.find(
        {email: recipientEmail},
    );
    // If no friend notify user
    if(friend.length == 0){
        req.flash('Failure', "No People Found With That Email. Please Try Again");
        return res.redirect('back'); // Quit
    } 
    // Save friend ID
    const friendId = friend[0]._id;
    // Information of person sending request
    const user = req.user;
    // Add your request to your requested friend pending array
    const addFriend = await User.findOneAndUpdate( 
        {_id: friendId},
        { $addToSet: { "friendsStorage.pending" : user }}
    );
    req.flash('success', "Friend Request Sent");
    res.redirect('back');
};

exports.acceptFriendRequest = async (req , res) =>{
    // Id of person who sent the request
    const friendId = req.params.id;
    // Current user that is logged in
    const userId = req.user._id;
    const user = {
        name: req.user.name,
        email: req.user.email,
        shows: req.user.myShows,
    };  
    // Send friend our info
    const sendFriendInfo = await User.findOneAndUpdate(
        {_id: friendId},
        { $addToSet: { "friendsStorage.friends" : user }}
    ) ;
   
    // Get friend info that sent request
    const friendInformation = await User.find(
        {_id: friendId},
    )
    // Store information of friend we want to pass
      const friendObj = {
        name: friendInformation[0].name,
        email: friendInformation[0].email,
        shows: friendInformation[0].myShows,
    };
    // Friend name to search for due to $pull on friend_id not working
    const friendEmail = friendObj.email
    // Remove friend from current users pending array
    const removeFromPending = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { "friendsStorage.pending" : { email: friendEmail }}},
        { new: true }
    );
    // Add friend to our friends array
    const addToUserFriendsArray = await User.findOneAndUpdate(
        {_id: userId},
        { $addToSet: { "friendsStorage.friends" : friendObj }}
    )
    req.flash('success', "Friend Request Accepted");
    res.redirect('/friends');
};

exports.denyFriendRequest = async (req, res) => {
    // Current user
    const userId = req.user._id;
    // Get friend info that sent request
    const friendId = req.params.id;
    const friendInformation = await User.find(
        {_id: friendId},
    )
    // Store information of friend we want to pass
    const friendEmail = friendInformation[0].email;

    // Remove friend from current users pending array
    const removeFromPending = await User.findOneAndUpdate(
       { _id: userId },
       { $pull: { "friendsStorage.pending" : { email: friendEmail }}},
       { new: true }
    );
    req.flash('success', "Denied Friend Request");
    res.redirect('/friends');
};

exports.displayFriends = async (req, res) => {
    // Current user
    const userId = req.user._id;
    // Current user's friends
    const friends = req.user.friendsStorage.friends;
    const emailsList =[];
    const friendsEmails = friends.forEach((friend)=> {
        emailsList.push(friend.email);
    });
    const friendsInfo = await User.find({email: emailsList })
    res.render(`displayFriends`, {friendInformation: friendsInfo});
};

exports.displayFriend = async (req, res) => {
    // Current user
    const friendID = req.params.id;
    // Current user's friends
    const friendsInfo = await User.find({_id: friendID })
    res.render(`displayFriend`, {friendInformation: friendsInfo[0]});
};

exports.removeFriend = async (req, res) => {
    // Current user
    const userID = req.user._id;
    const userEmail = req.user.email;
    // Friend to remove _id
    const friendNoMore = req.params.id;
    // Get friend info so we can query by name
    const friendsInfo = await User.find({_id: friendNoMore })
    const friendEmail = friendsInfo[0].email;
   
    const removeFromCurrentUser = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { "friendsStorage.friends" : { email: friendEmail }}},
        { new: true }
     );

    const removeFromFriends = await User.findOneAndUpdate(
        { email: friendEmail },
        { $pull: { "friendsStorage.friends" : { email: userEmail }}},
        { new: true }
     );

     req.flash("success", "Friend Removed");
     res.redirect('/displayFriends')
};

exports.nightMode = async (req, res) => {
    const user = await User.find(
        { _id: req.user._id }    
    )
    const currentNightModeValue = user[0].nightMode;
    const userID = req.user._id

    if(currentNightModeValue === false){
        await User.update(
            { _id: userID },
            { $set: { nightMode: true } }  
        )
    } else {
        await User.update(
            {_id: userID },
            {$set: { nightMode: false } }    
        )
    }
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
//     // pass info to req.body show saved to req.body
//     req.body.photo = `${uuid.v4()}.${fileExtension}`; 
//     // resize
//     const photo = await jimp.read(req.file.buffer);
//     await photo.resize(400, jimp.AUTO);
//     await photo.write(`./public/uploads/${req.body.photo}`);
//     // once saved to filesystem, continue.
//     next();
// }

