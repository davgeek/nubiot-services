'use strict';

const Boom = require('boom');
const Device = require('../model/Device');
const updateDeviceSchema = require('../schemas/updateDevice');
const isOwner = require('../util/middlewares').isOwner;

module.exports = {
  method: 'PATCH',
  path: '/api/devices/{device}',
  config: {
    pre: [
      { method: isOwner, assign: 'device' }
    ],
    handler: (req, res) => {
      const idDevice = req.params.device;
      Device
        .findOneAndUpdate({ _id: idDevice }, req.pre.device, (err, device) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!device) {
            throw Boom.notFound('Device not found!');
          }
          res({message: 'Device updated!'});
        });      
    },
    validate: {
      payload: updateDeviceSchema.payloadSchema,
      params: updateDeviceSchema.paramsSchema
    },
    auth: 'jwt'
  }
  
}