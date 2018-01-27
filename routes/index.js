const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', itineraryController.landingPage);
router.get('/addGathering', itineraryController.addGathering);
router.post('/addGathering', catchErrors(itineraryController.createGathering));




module.exports = router;