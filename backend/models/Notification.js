const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['approval', 'comment', 'mention'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'itemModel'
  },
  itemModel: {
    type: String,
    enum: ['Tool', 'Project', 'News']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema); 