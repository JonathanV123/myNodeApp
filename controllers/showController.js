const mongoose = require('mongoose');
const User = mongoose.model('User');
const request = require('request');
const rp = require('request-promise');

exports.landingPage = (req, res) => {
    res.render('landing')
};
exports.userHome = async (req, res) => {
    const friendsArr = req.user.friendsStorage.friends;
    const arr = [];
    // 2. Store Each Friend Email in Result
    const result = friendsArr.forEach(friend => arr.push(friend.email));
    // Find Each User with email and get all their contents
    const friendsInfo = await User.find({email: arr })
    res.render(`userHome`, {friendInformation: friendsInfo});
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Creation and Deletion ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
exports.selectShow = async (req, res) => {
    const showID = req.params.id;
    const comment = req.body.comment;
    var userModel = User;
    var options = {
        uri: `https://api.themoviedb.org/3/tv/${showID}?api_key=${process.env.MOVIEDB_KEY}&language=en-US`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
        User: userModel,
    };
    rp(options)
        .then(async function (data) {
                const showOptionsSaved = await User.update( 
                    {_id: req.user.id},
                    { $addToSet: { "myShows.showChoices": data } }
                );    
                res.render('showOptions', { 
                    showSelection : data, 
                 });                 
        })
        .catch(function (err) {
            console.log(err);
        });
};



exports.saveShow = async (req, res) => {
    // Refactor possible
        const showID = parseInt(req.params.id);
        const comment = req.body.comment;
        const category = req.body.showCategory;
        const userShowsArr = req.user.myShows.showChoices;
        const result = userShowsArr.filter(show => show.id === showID);
        // Add user comment and category
        result[0].ownerComment = comment;
        result[0].showCategory = category;
        if(category === "Must Watch"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $addToSet: { "myShows.mustWatch": result[0] }}
            );  
        }
        if(category === "Watching Now"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $addToSet: { "myShows.watchingNow": result[0] }}
            );  
        }
        if(category === "Recommendations"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $addToSet: { "myShows.recommendations": result[0] }}
            );  
        }
        const update = await User.update(
            { _id: req.user.id },
            { $set: {"myShows.showChoices": [] } }
        )
        req.flash('success', "Successfully saved the show");
        res.redirect('/userHome');
};

exports.addShow = (req, res) => { 
    res.render('addShow')
};


exports.removeShow = async (req, res) => {
    const showID = parseInt(req.params.id);
    let queryName = req.params.category;
    if(queryName === "Watching Now"){
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.watchingNow" : {id: showID}}},
            { new: true }
        )
    } else if (queryName === "Recommendations")
    {
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.recommendations" : {id: showID}}},
            { new: true }
        )
    }
    else if (queryName = 'Must Watch') {
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.mustWatch" : {id: showID}}},
            { new: true }
        )
    }
    req.flash('success', "Successfully removed the show");
    res.redirect('/userHome');
};
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Creation and Deletion ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Editing / Updating ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
exports.manageShows = async (req, res) => {
    const data = await User.find( 
        {_id: req.user._id},
        { myShows : 1 },
    );
    const watchingNowArr = data[0].myShows.watchingNow;
    const recommendationsArr = data[0].myShows.recommendations;
    const mustWatchArr = data[0].myShows.mustWatch;
    res.render(`showCollectionSelection`, {user: req.user , recommendationsArr, watchingNowArr, mustWatchArr});
};

exports.getShows = async (req, res) => {
    // query database for Shows
    const shows = await Shows.find();
    res.render('shows', { title: 'Shows', shows: shows});
}

// Not a fan of these three routes. Should be one single route.
exports.manageMustWatch = async (req, res) => {
    const category = "mustWatch";
    const data = await User.find( 
        {_id: req.user._id},
        { "myShows.mustWatch" : 1 },
    );
    res.render('manageShowCollection', {showInfo: data, showCategory: category })
};
exports.manageRecommendations = async (req, res) => {
    const category = "recommendations";
    const data = await User.find( 
        {_id: req.user._id},
        { "myShows.recommendations" : 1 },
);
    res.render('manageShowCollection', {showInfo: data, showCategory: category })
};
exports.watchingNow = async (req, res) => {
    const category = "watchingNow";
    const data = await User.find( 
        {_id: req.user._id},
        { "myShows.watchingNow" : 1 },
    );
    res.render('manageShowCollection', {showInfo: data, showCategory: category })
};
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Editing / Updating ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑







