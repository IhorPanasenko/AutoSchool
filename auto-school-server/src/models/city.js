const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'City name is required'],
  },
});

const CityModel = mongoose.model('cities', citySchema);

module.exports = CityModel;
