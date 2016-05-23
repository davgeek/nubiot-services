'use strict';

const Boom = require('boom');
const Device = require('../model/Device');
const createDeviceSchema = require('../schemas/createDevice');

module.exports = {
  method: 'POST',
  path: '/api/devices',
  config: {
    auth: 'jwt',
    handler: (req, res) => {
      let device = new Device();
      device.name = req.payload.name;
      device.description = req.payload.description;
      device.type = req.payload.type;
      device.icon = req.payload.icon;
      device.owner = req.auth.credentials.id;
      device.save((err, device) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        res({ success: true, message: 'Device created' }).code(200);
      });
    },
    validate: {
      payload: createDeviceSchema
    }
  }
}