'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = createUserSchema;