const mongoose = require('mongoose');

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
    default:
      'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uAVbsqYSIZ5yPewSQLCvNzxLE%25GXoq1S9yr6FObMFswRAyYib32yl3URN%25GcCW1TG87hXuci60y%25',
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

const CarModel = mongoose.model('cars', carSchema);

module.exports = CarModel;
