const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', catchErrors(itineraryController.landingPage));
router.get('/addGathering', catchErrors(itineraryController.addGathering));
router.get('/gatherings', itineraryController.getGatherings);
router.post('/addGathering', catchErrors(itineraryController.createGathering));
router.post('/addGathering:id', catchErrors(itineraryController.createGathering));




module.exports = router;