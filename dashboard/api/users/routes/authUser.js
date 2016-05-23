'use strict';

const Boom = require('boom');
const User = require('../model/User');
const authenticateUserSchema = require('../schemas/authUser');
const verifyCredentials = require('../util/userFunctions').verifyCredentials;
const createToken = require('../util/token');

module.exports = {
  method: 'POST',
  path: '/api/token',
  config: {
    auth: false,
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      res({ access_token: createToken(req.pre.user) }).code(201);
    }
  }  
}