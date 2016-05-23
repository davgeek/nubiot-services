'use strict';

var seneca = require('seneca')();
var influx= require('influx');

const DB_URI = process.env.INFLUX_IP;

var createDatabase = function(cb) {
  setTimeout(function() {
    var initDb = influx({host: DB_URI, username : 'root', password : 'root'});
    initDb.createDatabase('event', function(err) {
      if (err) { console.log('ERROR: ' + err); }
      cb();
    });
  }, 3000);
};

createDatabase(function() {
  var db = influx({host: DB_URI, username : 'root', password : 'root', database : 'event'});
  var ifx = require('./influxUtil')(db);

  seneca.add({role: 'serialize', cmd: 'read'}, function(args, callback) {
    ifx.readEvent(args.sensorId, args.start, args.end, function(err, data) {
      callback(err, data);
    });
  });

  seneca.add({role: 'serialize', cmd: 'write'}, function(args, callback) {
    ifx.writeEvent(args.nodeId, args.value, function(err) {
      callback(err);
    });
  });

  seneca.listen({port: process.env.SERIALIZER_PORT});
});

module.exports.seneca = seneca;