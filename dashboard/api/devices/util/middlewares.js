'use strict';

const Boom = require('boom');
const Device = require('../model/Device');

function isOwner(req, res) {
  const id = req.params.id;
  const idDevice = req.params.device;
  
  if(req.auth.credentials.id !== id) {
    res(Boom.badRequest('Not access'));
    return;
  }
  
  Device.findOne({_id: idDevice, owner: id}, (err, device) => {
    if(err) {
      res(Boom.badRequest('Not access!'));
      return;
    }
    if (!device) {
      res(Boom.badRequest('Not access!'));
      return;
    }
    res(req.payload);
  });
}

module.exports = {
  isOwner: isOwner
}