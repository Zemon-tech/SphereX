const express = require('express');
const router = express.Router();

const newsRoutes = require('./news');
const projectsRoutes = require('./projects');
const toolsRoutes = require('./tools');
const usersRoutes = require('./users');

router.use('/news', newsRoutes);
router.use('/projects', projectsRoutes);
router.use('/tools', toolsRoutes);
router.use('/users', usersRoutes);

module.exports = router; 