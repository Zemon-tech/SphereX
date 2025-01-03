const express = require('express');
const router = express.Router();

// GET /api/users/me
router.get('/me', async (req, res) => {
  try {
    res.json({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 