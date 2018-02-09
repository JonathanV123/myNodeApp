const mongoose = require('mongoose');
const Recommendations = mongoose.model('Recommendations');


exports.landingPage = (req, res) => {
    res.render('layout')
};

// ∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨ Recommendation Routes ∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨
exports.userHome = (req, res) => {
    res.render(`userHome`, {user: req.user});
}

exports.watchingNow = (req, res) => {
    res.render('watchingNow');
};


// ^^^^^^^^^^^^^^^^^^^^ Recommendation Routes ^^^^^^^^^^^^^^^^^^^^

exports.addRec = (req, res) => { 
    res.render('editRecommendation', {
        title: 'Add A Show'
    })
};

exports.createRecommendation = async (req, res) => {
    console.log(req.user);
    req.body.author = req.user._id;
    const recommendation = new Recommendations(req.body);
    await recommendation.save();
    res.redirect(`/recommendation/${recommendation.slug}`);
};

exports.getRecommendations = async (req, res) => {
    // query database for recommendations
    const recommendations = await Recommendations.find();
    res.render('recommendations', { title: 'Recommendations', recommendations: recommendations});
}

// const confirmOwner = (recommendation, user) => {
//     console.log(user);
//     // Must use MongoDb .equals to compare unique ._id to string id
//     if(!recommendation.author.equals(user._id)){
//         throw Error('You must be the owner of a gathering to edit it');
//     }
// };

exports.editRecommendation = async (req, res) => {
    // 1. Find the recommendation given the ID
    const recommendation = await Recommendations.findOne({ _id: req.params.id});
    // 2. Confirm they are recommendation owner
    // confirmOwner(recommendation, req.user); 
    // 3. Render edit form 
    res.render('editRecommendation', {title: `Edit ${recommendation.name}`, recommendation: recommendation})
}

exports.updateRecommendation = async (req, res) => {
    // set the location data to be a point 
    const recommendation = await Recommendations.findOneAndUpdate({ _id: req.params.id}, req.body,
        {
        new: true, //return the new recommendation instead of old one
        runValidators: true,
    }).exec();
    res.redirect(`/recommendation/${recommendation._id}/edit`);
};

exports.getRecommendationBySlug = async (req, res, next) => {
    // check params
    // res.json(req.params);
    const recommendation = await Recommendations.findOne({ slug: req.params.slug })
    .populate('author');
    // all data of recommendation (check if query is working)
    // res.json(gathering);
    // --------------------
    // if a query in mongoDB doesn't find anything, not an error will just return null
    // if no gathering add 404 TODO
    if( !recommendation ){
        return next();
    }
    res.render('recommendation', {recommendation, title: recommendation.name});
};

exports.getRecommendationsByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true }
    const tagsPromise = Recommendations.getTags();
    const recommendationsPromise = Recommendations.find({ tags: tagQuery });
    const [tags, recommendations] = await Promise.all([tagsPromise, recommendationsPromise]);
    res.render('tags', { tags, title: 'Tags', tag, recommendations });
};

// exports.searchRecommendations = async (req, res) => {
    // // 1. Find Recomendations
    // const recommendations = await Recommendations.find({
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
    // res.json(recommendations);
// };
