const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const Hackathon = require('../models/Hackathon');

// GET all hackathons
router.get('/', async (req, res) => {
  try {
    console.log('Fetching hackathons...');
    const hackathons = await Hackathon.find().sort({ startDate: 1 });
    console.log('Found hackathons:', hackathons);
    res.json(hackathons || []);
  } catch (error) {
    console.error('Error in GET /hackathons:', error);
    res.status(500).json({ message: 'Error fetching hackathons' });
  }
});

// GET single hackathon
router.get('/:id', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (error) {
    console.error('Error fetching hackathon detail:', error);
    res.status(500).json({ message: 'Error fetching hackathon detail' });
  }
});

// POST new hackathon (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Creating hackathon with data:', req.body);
    
    const hackathonData = {
      ...req.body,
      author: req.user.email,
      imageUrl: req.body.imageUrl || 'https://via.placeholder.com/800x400?text=Hackathon'
    };

    console.log('Final hackathon data:', hackathonData);

    const hackathon = new Hackathon(hackathonData);
    const savedHackathon = await hackathon.save();
    console.log('Saved hackathon:', savedHackathon);
    
    res.status(201).json(savedHackathon);
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(400).json({ message: 'Error creating hackathon' });
  }
});

// Update hackathon (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hackathon' });
  }
});

// Delete hackathon (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hackathon' });
  }
});

// Add visit tracking route
router.post('/:id/visit', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Increment visits
    hackathon.visits = (hackathon.visits || 0) + 1;
    
    // Add visit to history
    hackathon.visitHistory.push({
      timestamp: new Date(),
      userId: req.user?.uid || 'anonymous'
    });

    await hackathon.save();
    res.json({ visits: hackathon.visits });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ message: 'Error tracking visit' });
  }
});

// Add registration click tracking route
router.post('/:id/register-click', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    await hackathon.incrementRegistrationClicks(userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking registration click:', error);
    res.status(500).json({ message: 'Error tracking registration click' });
  }
});

// Add route to check registration status
router.get('/:id/registration-status/:userId', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    const hasRegistered = hackathon.hasUserRegistered(req.params.userId);
    res.json({ hasRegistered });
  } catch (error) {
    console.error('Error checking registration status:', error);
    res.status(500).json({ message: 'Error checking registration status' });
  }
});

module.exports = router; 