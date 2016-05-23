'use strict';

module.exports = function(client) {

  var writeCall = function(nodeId, value, cb) {
    client.writePoint('call', {nodeId: nodeId, value: value}, {}, function(err) {
      cb(err);
    });
  };

  var readCall = function(nodeId, start, end, cb) {
    client.query('select * from call where nodeId=\'' + nodeId + '\' and time > \'' + start + '\' and time < \'' + end + '\'', function(err, data) {
      cb(err, data);
    });
  };

  return {
    writeCall: writeCall,
    readCall: readCall
  };
};