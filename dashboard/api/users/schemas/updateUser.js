'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  admin: Joi.boolean()
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
}