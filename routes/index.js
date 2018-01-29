const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', itineraryController.landingPage);
router.get('/createGathering', itineraryController.addGathering);
router.get('/gatherings', itineraryController.getGatherings);
router.post('/createGathering', catchErrors(itineraryController.createGathering));
router.post('/createGathering:id', catchErrors(itineraryController.updateGathering));
router.get('/gatherings/:id/edit', catchErrors(itineraryController.editGathering));




module.exports = router;