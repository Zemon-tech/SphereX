const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const News = require('../models/News');

// GET all news
router.get('/', async (req, res) => {
  try {
    console.log('Fetching news...');
    const news = await News.find().sort({ createdAt: -1 });
    console.log('Found news:', news);
    res.json(news || []);
  } catch (error) {
    console.error('Error in GET /news:', error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// POST new news (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Creating news with data:', req.body);
    
    const newsData = {
      ...req.body,
      author: req.user.uid,
      imageUrl: req.body.imageUrl || 'https://via.placeholder.com/800x400?text=News'
    };

    if (req.body.tags && typeof req.body.tags === 'string') {
      newsData.tags = JSON.parse(req.body.tags);
    }

    console.log('Final news data:', newsData);

    const news = new News(newsData);
    const savedNews = await news.save();
    console.log('Saved news:', savedNews);
    
    res.status(201).json(savedNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(400).json({ message: 'Error creating news article' });
  }
});

// Add this route to handle news deletion
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const newsId = req.params.id;
    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Error deleting news' });
  }
});

// Add this route to get single news detail
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    res.status(500).json({ message: 'Error fetching news detail' });
  }
});

// Add this PUT route for updating news
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Updating news with id:', req.params.id);
    console.log('Update data:', req.body);

    const newsId = req.params.id;
    const updateData = {
      ...req.body,
      author: req.user.uid // Maintain the original author
    };

    // Handle tags if they're passed as a string
    if (req.body.tags && typeof req.body.tags === 'string') {
      updateData.tags = JSON.parse(req.body.tags);
    }

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    console.log('Updated news:', updatedNews);
    res.json(updatedNews);

  } catch (error) {
    console.error('Error updating news:', error);
    res.status(400).json({ message: 'Error updating news article' });
  }
});

module.exports = router; 