'use strict';

const Joi = require('joi');

const createDeviceSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100).required(),
  type: Joi.string().min(3).max(100).required(),
  icon: Joi.string().min(3).max(100).required()
});

module.exports = createDeviceSchema;