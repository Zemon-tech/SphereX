const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    store: new RedisStore({
      client: redis,
      prefix: 'rate-limit:'
    }),
    windowMs,
    max,
    message: {
      success: false,
      message: 'Too many requests, please try again later.'
    }
  });
};

module.exports = createRateLimiter; 