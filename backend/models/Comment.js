const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Project', 'Tool', 'News']
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'itemType'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema); 