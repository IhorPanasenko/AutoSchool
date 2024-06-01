const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  nameEN: {
    type: String,
    required: [true, 'City name in English is required'],
    unique: true,
  },
  nameUA: {
    type: String,
    required: [true, 'City name in Ukrainian is required'],
    unique: true,
  },
});

const CityModel = mongoose.model('cities', citySchema);

module.exports = CityModel;
