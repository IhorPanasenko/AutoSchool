const express = require('express');
const cityController = require('../controllers/cityController.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');

const router = express.Router();

router.get('/', cityController.getAllCities);

// for admin

router.use(authenticateJWT);
router.use(restrictTo('admin'));

router.post('/', cityController.addCity);

router.put('/:cityId', cityController.updateCity);

router.delete('/:cityId', cityController.deleteCity);

module.exports = router;
