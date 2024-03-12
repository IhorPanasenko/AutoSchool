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

exports.addCity = async (req, res) => {
  try {
    const newCity = await CityModel.create({
      name: req.body.name,
    });

    res.status(201).json({
      status: 'success',
      data: newCity,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    await CityModel.findByIdAndUpdate(req.params.cityId, {
      name: req.body.name,
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
