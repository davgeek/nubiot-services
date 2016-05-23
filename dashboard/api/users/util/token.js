'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../../config');

function createToken(user) {
  let scopes;
  
  if (user.admin) {
    scopes = 'admin';
  }

  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, config.key, { algorithm: 'HS256', expiresIn: "6h" } );
}

module.exports = createToken;