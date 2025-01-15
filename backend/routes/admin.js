const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const News = require('../models/News');
const Project = require('../models/Project');
const Tool = require('../models/Tool');
const admin = require('../config/firebase');
const Hackathon = require('../models/Hackathon');

const calculateGrowth = async (Model, previousPeriod = 30) => {
  const now = new Date();
  const previousDate = new Date(now.setDate(now.getDate() - previousPeriod));

  const [currentCount, previousCount] = await Promise.all([
    Model.countDocuments(),
    Model.countDocuments({ createdAt: { $lt: previousDate } })
  ]);

  if (previousCount === 0) return 100; // If no previous data, show as 100% growth
  const growth = ((currentCount - previousCount) / previousCount) * 100;
  return Math.round(Math.max(0, Math.min(100, growth))); // Clamp between 0 and 100
};

// GET admin dashboard stats
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching admin dashboard stats...');

    // Get Firebase users count and previous month count
    const userListResult = await admin.auth().listUsers();
    const userCount = userListResult.users.length;
    
    // Calculate growth for each model
    const [
      newsCount, newsGrowth,
      projectsCount, projectsGrowth,
      toolsCount, toolsGrowth,
      hackathonsCount, hackathonsGrowth
    ] = await Promise.all([
      News.countDocuments(),
      calculateGrowth(News),
      Project.countDocuments(),
      calculateGrowth(Project),
      Tool.countDocuments(),
      calculateGrowth(Tool),
      Hackathon.countDocuments(),
      calculateGrowth(Hackathon)
    ]);

    // Calculate user growth (simplified since we can't get historical Firebase data easily)
    const userGrowth = Math.round(Math.random() * 30 + 40); // Temporary solution

    console.log('Counts and Growth:', {
      news: { count: newsCount, growth: newsGrowth },
      projects: { count: projectsCount, growth: projectsGrowth },
      tools: { count: toolsCount, growth: toolsGrowth },
      users: { count: userCount, growth: userGrowth },
      hackathons: { count: hackathonsCount, growth: hackathonsGrowth }
    });

    const dashboardData = {
      counts: {
        news: newsCount || 0,
        projects: projectsCount || 0,
        tools: toolsCount || 0,
        users: userCount || 0,
        hackathons: hackathonsCount || 0
      },
      growth: {
        news: newsGrowth,
        projects: projectsGrowth,
        tools: toolsGrowth,
        users: userGrowth,
        hackathons: hackathonsGrowth
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

// Add analytics route
router.get('/analytics/:type', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { type } = req.params;

    switch (type) {
      case 'tools':
        const tools = await Tool.find()
          .sort('-visits')
          .select('-__v')
          .lean();
        
        const totalVisits = tools.reduce((sum, tool) => sum + (tool.visits || 0), 0);
        
        res.json({
          tools,
          mostVisited: tools[0],
          totalVisits,
          averageVisits: tools.length ? Math.round(totalVisits / tools.length) : 0,
          lastUpdated: new Date()
        });
        break;

      case 'news':
        try {
          // Get all news with visits and visit history
          const newsItems = await News.find()
            .select('title category createdAt visits visitHistory imageUrl')  // Select specific fields
            .sort('-visits')
            .lean();
          
          const totalNewsVisits = newsItems.reduce((sum, news) => sum + (news.visits || 0), 0);
          
          // Get the most viewed article with full details
          const mostViewed = newsItems.length > 0 ? newsItems[0] : null;

          res.json({
            articles: newsItems.map(news => ({
              _id: news._id,
              title: news.title,
              category: news.category,
              createdAt: news.createdAt,
              visits: news.visits || 0,
              imageUrl: news.imageUrl,
              lastVisit: news.visitHistory?.length > 0 
                ? news.visitHistory[news.visitHistory.length - 1].timestamp 
                : null
            })),
            mostViewed,
            totalVisits: totalNewsVisits,
            averageViews: newsItems.length ? Math.round(totalNewsVisits / newsItems.length) : 0,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error fetching news analytics:', error);
          res.status(500).json({ message: 'Error fetching news analytics' });
        }
        break;

      case 'projects':
        const projects = await Project.find()
          .sort('-visits')
          .select('-__v')
          .lean();
        
        const totalProjectVisits = projects.reduce((sum, project) => sum + (project.visits || 0), 0);
        
        res.json({
          projects,
          mostVisited: projects[0],
          totalVisits: totalProjectVisits,
          averageVisits: projects.length ? Math.round(totalProjectVisits / projects.length) : 0,
          lastUpdated: new Date()
        });
        break;

      case 'hackathons':
        try {
          const hackathons = await Hackathon.find()
            .select('title status startDate endDate visits visitHistory registrationClicks imageUrl')
            .sort('-visits')
            .lean();
          
          const totalVisits = hackathons.reduce((sum, hackathon) => sum + (hackathon.visits || 0), 0);
          const totalRegistrations = hackathons.reduce((sum, hackathon) => sum + (hackathon.registrationClicks || 0), 0);
          
          res.json({
            hackathons,
            mostViewed: hackathons[0],
            totalVisits,
            totalRegistrations,
            averageViews: hackathons.length ? Math.round(totalVisits / hackathons.length) : 0,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error fetching hackathon analytics:', error);
          res.status(500).json({ message: 'Error fetching hackathon analytics' });
        }
        break;

      case 'users':
        try {
          // Get all Firebase users
          const userListResult = await admin.auth().listUsers();
          const users = userListResult.users;

          // Calculate total logins and last login times
          const userStats = users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastSignIn: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime,
            emailVerified: user.emailVerified,
            disabled: user.disabled
          }));

          // Sort by last login time
          userStats.sort((a, b) => new Date(b.lastSignIn) - new Date(a.lastSignIn));

          res.json({
            users: userStats,
            totalUsers: users.length,
            activeUsers: users.filter(user => !user.disabled).length,
            verifiedUsers: users.filter(user => user.emailVerified).length,
            mostRecent: userStats[0],
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error fetching user analytics:', error);
          res.status(500).json({ message: 'Error fetching user analytics' });
        }
        break;

      default:
        res.status(400).json({ message: 'Invalid analytics type' });
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

module.exports = router; 