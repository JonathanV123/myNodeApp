const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');
const {catchErrors} = require('../errorHandler/errorHandling');

router.get('/', showController.landingPage);

router.get('/userHome',
    authenticationController.checkIfLoggedIn,
    showController.userHome
);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Show Routes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.get('/addShow',
    authenticationController.checkIfLoggedIn,
    showController.addShow
);
router.get('/selectShow/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.selectShow)
);

router.post('/saveShow/:id',
    authenticationController.checkIfLoggedIn,
    showController.saveShow,
);


// Want to refactor these 3 into a single route.
router.get('/manageMustWatch',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.manageMustWatch)
)
router.get('/manageRecommendations',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.manageRecommendations)
)
router.get('/manageWatchingNow',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.watchingNow)
)

// router.post('/createShow', 
// //     showController.upload,
// //     catchErrors(showController.resize),
//     authenticationController.checkIfLoggedIn,
//     catchErrors(showController.createShow),
// );
// router.get('/showOptions',
//      authenticationController.checkIfLoggedIn,
//      showController.showOptions
// );
// router.post('/createShow/:id', 
//     // showController.upload,
//     // catchErrors(showController.resize),
//     catchErrors(showController.updateShow)
// );

router.get('/manageShows',
    authenticationController.checkIfLoggedIn,
    showController.manageShows
);

router.post('/api/removeShow/:id/:category',
    authenticationController.checkIfLoggedIn,
    showController.removeShow,
);




router.get('/show/:slug', catchErrors(showController.getShowBySlug));

router.get('/tags', catchErrors(showController.getShowByTag));
router.get('/tags/:tag', catchErrors(showController.getShowByTag));
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Show Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑





// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  Friend Routes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.get('/friends',     
    authenticationController.checkIfLoggedIn,
    userController.friends);

router.post('/friends',
    catchErrors(userController.addFriend)
);

router.post('/friends/accept/:id',
    authenticationController.checkIfLoggedIn,
    userController.acceptFriendRequest
);

router.post('/friends/deny/:id',
    authenticationController.checkIfLoggedIn,
    userController.denyFriendRequest
);

router.get('/displayFriends',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.displayFriends)
)

router.get('/displayFriend/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.displayFriend)
)
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Friend Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑







// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Account and Login Routes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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

router.post('/nightMode',
    authenticationController.checkIfLoggedIn,
    userController.nightMode,
);
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Account and Login Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// // API
// router.get('/api/search', catchErrors(showController.searchShows));

module.exports = router;