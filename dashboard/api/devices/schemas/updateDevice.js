'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
Joi.shortid = require('joi-shortid');

const payloadSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
  type: Joi.string().min(3).max(100),
  icon: Joi.string().min(3).max(100)
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required(),
  device: Joi.shortid().required()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
}