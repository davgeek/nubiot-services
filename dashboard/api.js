'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const config = require('./config');

const server = new Hapi.Server();

server.connection({ port: process.env.dashboard_PORT, routes: { cors: true } });

server.register(
  require('hapi-auth-jwt')
  , (err) => {
  
  // auth strategy
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: config.key,
    verifyOptions: { algorithms: ['HS256'] }
  });
  
  // Load routes
  glob.sync('api/**/routes/*.js', { 
    root: __dirname 
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  // Connect to Mongo through Mongoose
  mongoose.connect(config.dbUrl, {}, (err) => {
    if (err) {
      throw err;
    }
    console.log('Server running');
  });
});