const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

// GET /api/users/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/:email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Only send public information
    const publicUserData = {
      name: user.name,
      college: user.college,
      branch: user.branch,
      linkedinId: user.linkedinId,
      githubId: user.githubId,
      instagramId: user.instagramId,
      profileImage: user.profileImage
    };
    res.json(publicUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/users/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        email: req.user.email,
        name: req.body.displayName,
        college: req.body.college,
        branch: req.body.branch,
        linkedinId: req.body.linkedinId,
        githubId: req.body.githubId,
        instagramId: req.body.instagramId,
        mobileNumber: req.body.mobileNumber,
        firebaseUid: req.user.uid
      },
      { new: true, upsert: true } // Create if doesn't exist
    );

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// POST /api/users/profile-image
router.post('/profile-image', authMiddleware, async (req, res) => {
  try {
    // Handle image upload logic here
    // This is a placeholder response
    res.json({ 
      photoURL: req.body.imageUrl || 'default-profile-image-url'
    });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({ message: 'Error uploading profile image' });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const { email, name, firebaseUid } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      email,
      name,
      firebaseUid,
      role: 'user'
    });
    
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router; 