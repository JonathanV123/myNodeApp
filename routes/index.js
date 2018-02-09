const express = require('express');
const router = express.Router();
const recController = require('../controllers/recController');
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', recController.landingPage);
router.get('/createShowRecommendation',
     authenticationController.checkIfLoggedIn,
     recController.addRec
);

// Recommendation Routes  
router.get('/userHome', 
    authenticationController.checkIfLoggedIn,
    recController.userHome 
);

// router.get('/manageShows',
//     authenticationController.checkIfLoggedIn,
//     recController.manageShows
// );

router.get('/watchingNow', 
    authenticationController.checkIfLoggedIn,
    recController.watchingNow
);

router.post('/addWatchingNow',
    userController.addWatchingNow,
);

router.get('/recommendations', recController.getRecommendations);

router.post('/createRecommendation', 
//     recController.upload,
//     catchErrors(recController.resize),
    catchErrors(recController.createRecommendation),
);
router.post('/createRecommendation/:id', 
    // recController.upload,
    // catchErrors(recController.resize),
    catchErrors(recController.updateRecommendation)
);
router.get('/recommendation/:id/edit', catchErrors(recController.editRecommendation));
router.get('/recommendation/:slug', catchErrors(recController.getRecommendationBySlug));

router.get('/tags', catchErrors(recController.getRecommendationsByTag));
router.get('/tags/:tag', catchErrors(recController.getRecommendationsByTag));

router.get('/login', userController.loginForm);
router.post('/login', authenticationController.login);

router.get('/register', userController.registerForm);
router.post('/register', 
    // 1. Validate registration data
    userController.validateRegistration,
    userController.register,
    // 3. Log user in
    authenticationController.login
);

router.get('/account', 
    authenticationController.checkIfLoggedIn, 
    userController.account
);

router.post('/account', catchErrors(userController.updateAccount));

router.get('/logout', authenticationController.logout);

router.post('/account/forgotPassword', catchErrors(authenticationController.forgotPassword));

router.get('/account/reset/:token', catchErrors(authenticationController.reset));

router.post('/account/reset/:token',
    authenticationController.confirmedPasswords, 
    catchErrors(authenticationController.update)
);

// // API
router.get('/api/search', catchErrors(recController.searchRecommendations));


module.exports = router;