const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', showController.landingPage);
router.get('/userHome', 
    authenticationController.checkIfLoggedIn,
    showController.userHome 
);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Show Routes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.get('/createShow',
     authenticationController.checkIfLoggedIn,
     showController.addShow
);
router.post('/createShow', 
//     showController.upload,
//     catchErrors(showController.resize),
    // authenticationController.checkIfLoggedIn,
    catchErrors(showController.createRecommendation),
);

router.post('/createShow/:id', 
    // showController.upload,
    // catchErrors(showController.resize),
    catchErrors(showController.updateShow)
);

router.get('/manageShows',
    authenticationController.checkIfLoggedIn,
    showController.manageShows
);

router.get('/watchingNow',
    authenticationController.checkIfLoggedIn,
    showController.watchingNow
);

router.post('/watchingNow',
    showController.addWatchingNow,
);

// router.get('/api/watchingNow/:id',   
//     authenticationController.checkIfLoggedIn, 
//     showController.getWatchingNowById
// );

router.post('/api/removeShow/:id', 
    authenticationController.checkIfLoggedIn,    
    showController.removeShow,
);


router.get('/show/:slug', catchErrors(showController.getShowBySlug));

router.get('/tags', catchErrors(showController.getShowByTag));
router.get('/tags/:tag', catchErrors(showController.getShowByTag));
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Show Routes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


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


// // API
// router.get('/api/search', catchErrors(showController.searchShows));

module.exports = router;