const mongoose = require('mongoose');
const Shows = mongoose.model('Media');
const User = mongoose.model('User');


exports.landingPage = (req, res) => {
    res.render('layout')
};

exports.userHome = async (req, res) => {
    // Get user recommendations
    const recommendations = await Shows.find({ author: req.user._id });
    const watchingNow = await User.find( 
        {_id: req.user._id},
        { watchingNow : 1 }
    )
    const watchingNowArr = watchingNow[0].watchingNow
    res.json(watchingNow);
    // res.render(`userHome`, {user: req.user , recommendations, watchingNowArr});
}

exports.watchingNow = (req, res) => {
    res.render('watchingNow');
};

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Creation ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
exports.addWatchingNow = async (req, res) => {
    const show = req.body.name
    const watchingNowPromise = await User.findOneAndUpdate( 
            {_id: req.user.id},
            { $push: { watchingNow: { name: show }} }
    );
    await watchingNowPromise.save();
    res.redirect('/userHome');
};
exports.addShow = (req, res) => { 
    res.render('addShow', {
        title: 'Add A Show'
    })
};

exports.createShow = async (req, res) => {
    req.body.author = req.user._id;
    const show = new Shows(req.body);
    await show.save();
    // res.redirect(`/show/${show.slug}`);
    res.redirect('/userHome');
};
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Creation ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Editing / Updating ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
exports.manageShows = (req, res) => {
    res.render('manageShows');
};

exports.getShows = async (req, res) => {
    // query database for Shows
    const shows = await Shows.find();
    res.render('shows', { title: 'Shows', shows: shows});
}

exports.editShow = async (req, res) => {
    // 1. Find the show given the ID
    const show = await Shows.findOne({ _id: req.params.id});
    // 2. Confirm they are show owner
    // confirmOwner(show, req.user); 
    // 3. Render edit form 
    res.render('editshow', {title: `Edit ${show.name}`, show: show})
}

exports.updateShow = async (req, res) => {
    // set the location data to be a point 
    const show = await Shows.findOneAndUpdate({ _id: req.params.id}, req.body,
        {
        new: true, //return the new show instead of old one
        runValidators: true,
    }).exec();
    res.redirect(`/show/${show._id}/edit`);
};
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Editing / Updating ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




// const confirmOwner = (show, user) => {
//     console.log(user);
//     // Must use MongoDb .equals to compare unique ._id to string id
//     if(!show.author.equals(user._id)){
//         throw Error('You must be the owner of a gathering to edit it');
//     }
// };



exports.getShowBySlug = async (req, res, next) => {
    // check params
    // res.json(req.params);
    const show = await Shows.findOne({ slug: req.params.slug })
    .populate('author');
    // all data of show (check if query is working)
    // res.json(gathering);
    // --------------------
    // if a query in mongoDB doesn't find anything, not an error will just return null
    // if no gathering add 404 TODO
    if( !show ){
        return next();
    }
    res.render('show', {show, title: show.name});
};

exports.getShowsByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true }
    const tagsPromise = Shows.getTags();
    const ShowsPromise = Shows.find({ tags: tagQuery });
    const [tags, Shows] = await Promise.all([tagsPromise, ShowsPromise]);
    res.render('tags', { tags, title: 'Tags', tag, Shows });
};

// exports.searchShows = async (req, res) => {
    // // 1. Find Recomendations
    // const shows = await Shows.find({
    //     $text: {
    //         $search: req.query.q
    //     }
    // }, {
    //     // Project Score 
    //     score: { $meta: 'textScore' }
    // })
    // // Sort it
    // .sort({
    //     score: { $meta: 'textScore'}
    // }).limit(5);
    // res.json(Shows);
// };
