const mongoose = require('mongoose');

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

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = ReviewModel;
