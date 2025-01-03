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
  price: {
    type: String,
    default: 'Free'
  },
  category: {
    type: String,
    required: true
  },
  link: {
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
  }
});

module.exports = mongoose.model('Tool', toolSchema); 