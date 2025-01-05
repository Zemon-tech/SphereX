const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: String,
  link: String,
  creator: String,
  tags: [String],
  features: [{
    title: String,
    description: String
  }],
  previewImages: [String],
  author: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  ratings: [{
    userId: String,
    rating: Number
  }],
  averageRating: {
    type: Number,
    default: 0
  }
});

// Add method to calculate average rating
toolSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
};

module.exports = mongoose.model('Tool', toolSchema); 