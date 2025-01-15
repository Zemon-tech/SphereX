const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  imageUrl: String,
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  visits: {
    type: Number,
    default: 0
  },
  visitHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    userId: String
  }]
});

module.exports = mongoose.model('News', newsSchema); 