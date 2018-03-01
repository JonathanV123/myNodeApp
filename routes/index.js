const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');
const {catchErrors} = require('../errorHandler/errorHandling');

router.get('/', showController.landingPage);

router.get('/userHome',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.userHome)
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
    catchErrors(showController.saveShow)
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

router.get('/manageShows',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.manageShows)
);

router.post('/removeShow/:id/:category',
    authenticationController.checkIfLoggedIn,
    catchErrors(showController.removeShow)
);

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Show Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  Friend Routes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.get('/friends',     
    authenticationController.checkIfLoggedIn,
    userController.friends
);

router.post('/friends',
    catchErrors(userController.addFriend)
);

router.post('/friends/accept/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.acceptFriendRequest)
);

router.post('/friends/deny/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.denyFriendRequest)
);

router.post('/removeFriend/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.removeFriend)
);

router.get('/displayFriends',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.displayFriends)
);

router.get('/displayFriend/:id',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.displayFriend)
);
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

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Account and Login Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

router.post('/nightMode',
    authenticationController.checkIfLoggedIn,
    catchErrors(userController.nightMode),
);

module.exports = router;