const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { catchErrors } = require('../errorHandler/errorHandling');

router.get('/', itineraryController.landingPage);
router.get('/createGathering', itineraryController.addGathering);
router.get('/gatherings', itineraryController.getGatherings);
router.post('/createGathering', 
    itineraryController.upload,
    catchErrors(itineraryController.resize),
    catchErrors(itineraryController.createGathering),
);
router.post('/createGathering:id', 
    itineraryController.upload,
    catchErrors(itineraryController.resize),
    catchErrors(itineraryController.updateGathering));
router.get('/gatherings/:id/edit', catchErrors(itineraryController.editGathering));
router.get('/gathering/:slug', catchErrors(itineraryController.getGatheringBySlug));

router.get('/tags', catchErrors(itineraryController.getGatheringsByTag));
router.get('/tags/:tag', catchErrors(itineraryController.getGatheringsByTag));


module.exports = router;