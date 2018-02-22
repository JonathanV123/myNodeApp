const mongoose = require('mongoose');
// const Shows = mongoose.model('Media');
const User = mongoose.model('User');
const request = require('request');
const rp = require('request-promise');



exports.landingPage = (req, res) => {
    res.render('layout')
};

exports.userHome = async (req, res) => {
    res.render(`userHome`);
}

exports.watchingNow = (req, res) => {
    res.render('watchingNow');
};


// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Creation and Deletion ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
exports.createShow = async (req, res) => {
    const show = req.body.name
    const tag = req.body.tags;
    const category = req.body.showCategory
    var testing = User;
    var options = {
        uri: `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIEDB_KEY}&query=${show}`,
        // qs: {
        //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
        // },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
        User: testing,
    };
    rp(options)
        .then(async function (repos) {
            if(repos.results.length < 1){
                res.send('No matches');
            } else {
                const showOptionsSaved = await User.update( 
                    {_id: req.user.id},
                    { $push: { "myShows.showChoices": { $each: repos.results} } }
                );    
                res.render('showOptions', { 
                    showSelections : repos.results, 
                 });    
            }        
        })
        .catch(function (err) {
            console.log(err);
        });
    // res.redirect('/userHome');
};

exports.addWatchingNow = async (req, res) => {
    const show = req.body.name;
    var testing = User;
    var options = {
        uri: `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIEDB_KEY}&query=${show}`,
        // qs: {
        //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
        // },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
        User: testing,
    };
    rp(options)
        .then(async function (repos) {
            if(repos.results.length < 1){
                res.send('No matches');
            } else {
                const showOptionsSaved = await User.update( 
                    {_id: req.user.id},
                    { $addToSet: { "myShows.showChoices": { $each: repos.results} } }
                );    
                res.render('showOptions', { showSelections : repos.results });    
            }        
        })
        .catch(function (err) {
            console.log(err);
        });
    // const tag = req.body.tags;
    // const watchingNowPromise = await User.findOneAndUpdate( 
    //         {_id: req.user.id},
    //         { $addToSet: { "myShows.watchingNow": { name: show, tags: tag }} }
    // );
    // await watchingNowPromise.save();
    // res.redirect('/userHome');
};

exports.saveShow = async (req, res) => {
        const showID = parseInt(req.body.showId);
        const userShowsArr = req.user.myShows.showChoices;
        const result = userShowsArr.filter(show => show.id === showID);
        console.log(result[0]);
        if(req.body.radioValCategory === "Must Watch"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $push: { "myShows.mustWatch": result[0] }}
            );  
        }
        if(req.body.radioValCategory === "Watching Now"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $push: { "myShows.watchingNow": result[0] }}
            );  
        }
        if(req.body.radioValCategory === "Recommendations"){
            const saveShow = await User.update( 
                {_id: req.user.id},
                { $push: { "myShows.recommendations": result[0] }}
            );  
        }
        await User.update(
            { _id: req.user.id },
            { $set: {"myShows.showChoices": [] } }
        )
         res.render('manageShows')
};

exports.submitShow = (req, res) => { 
    res.render('addShow', {
        title: 'Add A Show'
    })
};

// exports.getWatchingNowById = async (req, res) => {
//     // const id = req.params.id;
//     // const show = await User.find(
//     //     { _id: req.user.id },
//     //     { watchingNow: { $elemMatch: {_id: id }}}
//     // )
//     // res.send(show);
// };

exports.removeShow = async (req, res) => {
    // This is an ugly if else statement. Why isn't it possible to
    // change queryName directly in a single findByIdAndUpdate?
    // ask on stackoverflow
    const showID = parseInt(req.params.id);
    let queryName = req.body.category;
    if(queryName === "watchingNow"){
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.watchingNow" : {id: showID}}},
            { new: true }
        )
            res.json(user);
    } else if (queryName === "recommendations")
    {
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.recommendations" : {id: showID}}},
            { new: true }
        )
            res.json(user);    
    }
    else if (queryName = 'mustWatch') {
        const user = await User.findByIdAndUpdate(req.user._id,
            { $pull: { "myShows.mustWatch" : {id: showID}}},
            { new: true }
        )
            res.json(user); 
    }
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
    const mustWatchArr = data[0].myShows.mustWatch
    res.render(`manageShows`, {user: req.user , recommendationsArr, watchingNowArr, mustWatchArr});
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

