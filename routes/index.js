const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const userController = require('../controllers/userController');
const authenticationController = require('../controllers/authenticationController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', itineraryController.landingPage);
router.get('/createGathering',
     authenticationController.checkIfLoggedIn,
     itineraryController.addGathering
);
router.get('/gatherings', itineraryController.getGatherings);
router.post('/createGathering', 
    itineraryController.upload,
    catchErrors(itineraryController.resize),
    catchErrors(itineraryController.createGathering),
);
router.post('/createGathering:id', 
    itineraryController.upload,
    catchErrors(itineraryController.resize),
    catchErrors(itineraryController.updateGathering)
);
router.get('/gatherings/:id/edit', catchErrors(itineraryController.editGathering));
router.get('/gathering/:slug', catchErrors(itineraryController.getGatheringBySlug));

router.get('/tags', catchErrors(itineraryController.getGatheringsByTag));
router.get('/tags/:tag', catchErrors(itineraryController.getGatheringsByTag));

router.get('/login', userController.loginForm);
router.post('/login', authenticationController.login);

router.get('/register', userController.registerForm);
router.post('/register', 
    // 1. Validate registration data
    userController.validateRegistration,
    // 2. Register the user
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



// API
router.get('/api/search', catchErrors(itineraryController.searchGatherings));


module.exports = router;