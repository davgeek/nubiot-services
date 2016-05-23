'use strict';

const Boom = require('boom');
const OAuth2Boom = require('oauth2boom');
const User = require('../model/User');
const bcrypt = require('bcrypt');

function verifyUniqueUser(req, res) {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({ 
    $or: [ 
      { email: req.payload.email }, 
      { username: req.payload.username }
    ]
  }, (err, user) => {
    if (user) {
      if (user.username === req.payload.username) {
        res(Boom.badRequest('Username taken'));
        return;
      }
      if (user.email === req.payload.email) {
        res(Boom.badRequest('Email taken'));
        return;
      }
    }
    res(req.payload);
  });
}

function verifyCredentials(req, res) {
  
  const password = req.payload.password;
  console.log(req.payload);
  var error = OAuth2Boom.invalidClient();

  User.findOne({ username: req.payload.username },
    (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          res(user);
        }
        else {
          res(error);
        }
      });
    } else {
      res(error);
    }
  });
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
}