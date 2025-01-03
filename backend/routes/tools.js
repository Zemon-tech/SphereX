const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const Tool = require('../models/Tool');

// GET all tools
router.get('/', async (req, res) => {
  try {
    console.log('Fetching tools...');
    const tools = await Tool.find().sort({ createdAt: -1 });
    console.log('Found tools:', tools);
    res.json(tools || []);
  } catch (error) {
    console.error('Error in GET /tools:', error);
    res.status(500).json({ message: 'Error fetching tools' });
  }
});

// GET single tool
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(tool);
  } catch (error) {
    console.error('Error fetching tool detail:', error);
    res.status(500).json({ message: 'Error fetching tool detail' });
  }
});

// POST new tool (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Creating tool with data:', req.body);
    
    const toolData = {
      ...req.body,
      author: req.user.uid,
      imageUrl: req.body.imageUrl || 'https://via.placeholder.com/800x400?text=Tool'
    };

    if (req.body.tags && typeof req.body.tags === 'string') {
      toolData.tags = JSON.parse(req.body.tags);
    }

    console.log('Final tool data:', toolData);

    const tool = new Tool(toolData);
    const savedTool = await tool.save();
    console.log('Saved tool:', savedTool);
    
    res.status(201).json(savedTool);
  } catch (error) {
    console.error('Error creating tool:', error);
    res.status(400).json({ message: 'Error creating tool' });
  }
});

// DELETE tool (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const toolId = req.params.id;
    const deletedTool = await Tool.findByIdAndDelete(toolId);
    if (!deletedTool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting tool:', error);
    res.status(500).json({ message: 'Error deleting tool' });
  }
});

module.exports = router; 