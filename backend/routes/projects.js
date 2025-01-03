const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    console.log('Fetching projects...');
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log('Found projects:', projects);
    res.json(projects || []);
  } catch (error) {
    console.error('Error in GET /projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project detail:', error);
    res.status(500).json({ message: 'Error fetching project detail' });
  }
});

// POST new project (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Creating project with data:', req.body);
    
    const projectData = {
      ...req.body,
      author: req.user.uid,
      imageUrl: req.body.imageUrl || 'https://via.placeholder.com/800x400?text=Project'
    };

    if (req.body.tags && typeof req.body.tags === 'string') {
      projectData.tags = JSON.parse(req.body.tags);
    }

    console.log('Final project data:', projectData);

    const project = new Project(projectData);
    const savedProject = await project.save();
    console.log('Saved project:', savedProject);
    
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ message: 'Error creating project' });
  }
});

// DELETE project (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router; 