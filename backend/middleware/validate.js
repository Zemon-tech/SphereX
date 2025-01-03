const Joi = require('joi');
const { errorResponse } = require('../utils/responseHandler');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return errorResponse(res, 'Validation Error', 400, error.details[0].message);
    }
    next();
  };
};

module.exports = validate; 