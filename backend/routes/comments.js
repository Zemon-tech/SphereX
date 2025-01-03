const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Get comments for an item
router.get('/:itemType/:itemId', async (req, res) => {
  try {
    const { itemType, itemId } = req.params;
    const comments = await Comment.find({
      itemType,
      itemId
    })
      .sort({ createdAt: -1 })
      .populate('author', 'name profileImage');

    successResponse(res, comments);
  } catch (error) {
    errorResponse(res, 'Error fetching comments');
  }
});

// Create comment
router.post('/:itemType/:itemId', authMiddleware, async (req, res) => {
  try {
    const { itemType, itemId } = req.params;
    const comment = new Comment({
      content: req.body.content,
      author: req.user.uid,
      itemType,
      itemId
    });

    const savedComment = await comment.save();
    await savedComment.populate('author', 'name profileImage');
    
    successResponse(res, savedComment, 'Comment created successfully', 201);
  } catch (error) {
    errorResponse(res, 'Error creating comment', 400);
  }
});

// Update comment
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }

    if (comment.author.toString() !== req.user.uid) {
      return errorResponse(res, 'Not authorized', 403);
    }

    comment.content = req.body.content;
    await comment.save();
    await comment.populate('author', 'name profileImage');

    successResponse(res, comment, 'Comment updated successfully');
  } catch (error) {
    errorResponse(res, 'Error updating comment', 400);
  }
});

// Delete comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }

    if (comment.author.toString() !== req.user.uid && !req.user.isAdmin) {
      return errorResponse(res, 'Not authorized', 403);
    }

    await comment.deleteOne();
    successResponse(res, null, 'Comment deleted successfully');
  } catch (error) {
    errorResponse(res, 'Error deleting comment');
  }
});

module.exports = router; 