require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const News = require('./models/News');
const routeLogger = require('./middleware/routeLogger');
const indexRouter = require('./routes/index');
import { Analytics } from "@vercel/analytics/react"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Add this after other middleware
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Routes - Move these before the React routing handlers
app.use('/api', express.Router()
  .use('/news', require('./routes/news'))
  .use('/projects', require('./routes/projects'))
  .use('/tools', require('./routes/tools'))
  .use('/users', require('./routes/users'))
  .use('/admin', require('./routes/admin'))
  .use('/hackathons', require('./routes/hackathons'))
  .use('/test', require('./routes/test'))
);

// Add a root API route
app.get('/api', (req, res) => {
  res.json({
    message: 'SphereX API',
    endpoints: [
      '/api/news',
      '/api/projects',
      '/api/tools',
      '/api/users',
      '/api/admin',
      '/api/test'
    ]
  });
});

// Handle React routing in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    next();
  });
}

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  // Default route for development
  app.get('/', (req, res) => {
    res.json({ message: 'SphereX API Server' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Add after other middleware
app.use(routeLogger);

// Add before other API routes
app.use('/api', indexRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Test the connection by counting news articles
    News.countDocuments().then(count => {
      console.log(`Found ${count} news articles in database`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 