'use strict';

var mqtt = require('mqtt').connect('mqtt://'+ process.env.BROKER_IP +':1883');
var seneca = require('seneca')();

seneca.add({role: 'actuate', cmd: 'set'}, function(args, callback) {
	var device = args.device;
	var node = args.node;
	var property = args.property;
	var payload = args.value;
	if(args.parse){
		payload = JSON.stringify({'value':  args.value});	
	}
	mqtt.publish('devices/' + device + '/' + node + '/' + property + '/set', new Buffer(payload), {qos: 0, retain: true}, function (err) {
		callback(err);
	});
});

seneca.listen({port: process.env.ACTUATOR_PORT});