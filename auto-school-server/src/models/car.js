const mongoose = require('mongoose');
const s3 = require('../config/s3Bucket.js');
const { deletePhotoFromS3 } = require('../helpers/s3Handlers');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'Car model is required'],
  },
  year: {
    type: Number,
    required: [true, 'Car year is required'],
    validate: {
      validator: function (value) {
        const currentYear = new Date().getFullYear();
        return (value) => 1980 && value <= currentYear;
      },
      message: (props) =>
        `${props.value} is not a valid car year. Must be gte than 1980 and lte to current year`,
    },
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic'],
    default: 'manual',
  },
  photoURL: {
    type: String,
    default: 'default-car.jpg',
  },
  ratings: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
      },
    },
  ],
});

carSchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) return 0;

  const totalRating = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return totalRating / this.ratings.length;
});

carSchema.virtual('totalRatings').get(function () {
  return this.ratings.length;
});

carSchema.post('findOneAndDelete', async function (doc) {
  try {
    console.log("Deleting car's photo from S3");
    await deletePhotoFromS3(s3, doc.photoURL);
  } catch (err) {
    console.log(err);
  }
});

const CarModel = mongoose.model('cars', carSchema);

module.exports = CarModel;
