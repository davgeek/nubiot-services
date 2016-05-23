'use strict';

const Boom = require('boom');
const Device = require('../model/Device');
const updateDeviceSchema = require('../schemas/updateDevice');
const isOwner = require('../util/middlewares').isOwner;

module.exports = {
  method: 'DELETE',
  path: '/api/devices/{device}',
  config: {
    pre: [
      { method: isOwner, assign: 'device' }
    ],
    handler: (req, res) => {
      const idDevice = req.params.device;
      Device
        .findOneAndRemove({ _id: idDevice }, (err, device) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!device) {
            throw Boom.notFound('Device not found!');
          }
          res({message: 'Device deleted!'});
        });      
    },
    auth: 'jwt'
  }
  
}