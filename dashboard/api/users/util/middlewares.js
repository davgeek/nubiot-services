'use strict';

const Boom = require('boom');
const User = require('../model/User');

// middleware for validate self updates
function isSelf(req, res) {
  const id = req.params.id;
   
  if(req.auth.credentials.id !== id) {
    res(Boom.badRequest('No access'));
    return;
  }
  res(req.payload);
}

module.exports = {
  isSelf: isSelf
}