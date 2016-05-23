'use strict';

const Device = require('../model/Device');
const Boom = require('boom');
const isOwner = require('../util/middlewares').isOwner;

module.exports = {
  method: 'GET',
  path: '/api/devices',
  config: {
    handler: (req, res) => {
      const owner = req.auth.credentials.id;
      Device
        .find({owner: owner})
        .select('-owner -__v -nodes -created_at -updated_at -mqtt -type')
        .sort('-created_at')
        .exec((err, devices) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!devices.length) {
            throw Boom.notFound('No device yet');
          }
          res({devices: devices});
        })
    },
    auth: 'jwt'
  }
}