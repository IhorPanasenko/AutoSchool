const express = require('express');
const cityController = require('../controllers/cityController.js');

const router = express.Router();

router.get('/', cityController.getAllCities);

// for admin

router.post('/', cityController.addCity);

router.put('/:cityId', cityController.updateCity);

module.exports = router;
