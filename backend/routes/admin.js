const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const News = require('../models/News');
const Project = require('../models/Project');
const Tool = require('../models/Tool');
const admin = require('../config/firebase');

// GET admin dashboard stats
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching admin dashboard stats...');

    // Get Firebase users count
    const userListResult = await admin.auth().listUsers();
    const userCount = userListResult.users.length;
    console.log('Firebase users count:', userCount);

    // Get MongoDB counts
    const [newsCount, projectsCount, toolsCount] = await Promise.all([
      News.countDocuments(),
      Project.countDocuments(),
      Tool.countDocuments()
    ]);

    console.log('Counts:', {
      news: newsCount,
      projects: projectsCount,
      tools: toolsCount,
      users: userCount
    });

    const dashboardData = {
      counts: {
        news: newsCount || 0,
        projects: projectsCount || 0,
        tools: toolsCount || 0,
        users: userCount || 0
      },
      lastUpdated: new Date()
    };

    console.log('Sending dashboard data:', dashboardData);
    res.json(dashboardData);

  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ message: 'Error fetching admin dashboard' });
  }
});

// Get pending content
router.get('/pending-content', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [projects, tools, news] = await Promise.all([
      Project.find({ approved: false }).populate('author', 'name'),
      Tool.find({ approved: false }).populate('author', 'name'),
      News.find({ approved: false }).populate('author', 'name')
    ]);

    res.json({ projects, tools, news });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending content' });
  }
});

module.exports = router; 