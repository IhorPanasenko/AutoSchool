const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'City name is required'],
    unique: true,
  },
});

const CityModel = mongoose.model('cities', citySchema);

module.exports = CityModel;
