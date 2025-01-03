const Notification = require('../models/Notification');
const { notifyUser } = require('../websocket');

const createNotification = async (recipientId, type, content, relatedItem, itemModel) => {
  try {
    const notification = new Notification({
      recipient: recipientId,
      type,
      content,
      relatedItem,
      itemModel
    });

    await notification.save();

    // Send real-time notification
    notifyUser(recipientId, {
      type: 'notification',
      data: notification
    });

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

module.exports = { createNotification }; 