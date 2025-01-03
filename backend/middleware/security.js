const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const securityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Sanitize data
  app.use(mongoSanitize());

  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
};

module.exports = securityMiddleware; 