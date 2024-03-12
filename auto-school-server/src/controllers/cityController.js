const CityModel = require('../models/city.js');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await CityModel.find();

    res.status(200).json({
      status: 'success',
      results: cities.length,
      data: cities,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
