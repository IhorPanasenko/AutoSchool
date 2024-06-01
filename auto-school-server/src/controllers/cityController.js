const catchAsync = require('../helpers/catchAsync.js');
const CityModel = require('../models/city.js');

exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await CityModel.find();

  res.status(200).json({
    status: 'success',
    results: cities.length,
    data: cities,
  });
});

exports.addCity = catchAsync(async (req, res, next) => {
  const newCity = await CityModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newCity,
  });
});

exports.updateCity = catchAsync(async (req, res, next) => {
  const city = await CityModel.findByIdAndUpdate(req.params.cityId, {
    name: req.body.name,
  });

  if (!city) {
    return next(new AppError('No city was found with such id', 404));
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  // const city = await CityModel.findByIdAndDelete(req.params.cityId);

  // if (!city) {
  //   return next(new AppError('No city was found with such id', 404));
  // }

  // res.status(204).json({
  //   status: 'success',
  // });
  res.status(500).json({
    message: 'Route is not yet implemented',
  });
});
