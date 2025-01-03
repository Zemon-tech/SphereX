const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Notification = require('../models/Notification');

// Get user's notifications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.uid })
      .sort({ createdAt: -1 })
      .populate('relatedItem');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.uid },
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark all notifications as read
router.post('/read-all', authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.uid, read: false },
      { read: true }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 