const Joi = require('joi');

const schemas = {
  news: Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
  }),

  project: Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10),
    githubLink: Joi.string().required().uri(),
    tags: Joi.array().items(Joi.string())
  }),

  tool: Joi.object({
    name: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10),
    link: Joi.string().required().uri(),
    tags: Joi.array().items(Joi.string())
  }),

  user: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

module.exports = schemas; 