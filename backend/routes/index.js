const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SphereX API',
    version: '1.0.0',
    status: 'running'
  });
});

module.exports = router; 