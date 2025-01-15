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

// POST new project
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Creating project with data:', req.body);
    
    const projectData = {
      ...req.body,
      author: req.user.email,
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

// DELETE project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin or project author
    const adminEmails = ['shivangkandoi@gmail.com'];
    if (!adminEmails.includes(req.user.email) && project.author !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Update project
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is admin or project author
    const adminEmails = ['shivangkandoi@gmail.com'];
    if (!adminEmails.includes(req.user.email) && project.author !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, author: project.author },
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project' });
  }
});

// Add visit tracking route
router.post('/:id/visit', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Increment visits
    project.visits = (project.visits || 0) + 1;
    
    // Add visit to history
    project.visitHistory.push({
      timestamp: new Date(),
      userId: req.user?.uid || 'anonymous'
    });

    await project.save();
    res.json({ visits: project.visits });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ message: 'Error tracking visit' });
  }
});

module.exports = router; 