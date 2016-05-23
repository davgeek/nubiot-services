'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/users',
  config: {
    handler: (req, res) => {
      console.log(req.auth.credentials.id);
      User
        .findOne(req.auth.credentials.id)
        .select('-password -__v')
        .exec((err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          res(user);
        })
    },
    auth: 'jwt'
  }
}