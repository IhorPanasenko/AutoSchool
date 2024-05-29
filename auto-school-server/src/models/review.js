const mongoose = require('mongoose');
const InstructorModel = require('./instructor.js');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      required: [true, 'Review must have rating'],
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students',
      required: [true, 'Review must be written by student'],
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'instructors',
      required: [true, 'Reviews must belong to instructor'],
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'studentId',
    select: 'name surname _id',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (instructor) {
  const stats = await this.aggregate([
    {
      $match: { instructorId: instructor },
    },
    {
      $group: {
        _id: '$instructorId',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await InstructorModel.findByIdAndUpdate(instructor, {
    averageRating: stats[0]?.avgRating || 4.5,
    ratingsQuantity: stats[0]?.nRating || 0,
  });
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.instructorId);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) await doc.constructor.calcAverageRatings(doc.instructorId);
});

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = ReviewModel;
