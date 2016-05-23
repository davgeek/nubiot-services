'use strict';

var express = require('express');
var router = express.Router();
var seneca = require('seneca')();
var validator = require('validator');

// seneca clients
seneca.client({host: process.env.ACTUATOR_IP, port: process.env.ACTUATOR_PORT, pin: {role: 'actuate', cmd: 'set'}});

// property set route
router.get('/devices/:device/:node/:type(on|slider|color|value)/set', (req, res) => {
	var device = req.params.device;
	var node =  req.params.node;
	var property = req.params.type;
	var value = req.query.value;
	var strParse = req.query.json || "true";
	var parse = validator.isBoolean(strParse) ? validator.toBoolean(strParse) : true;
	seneca.act({role: 'actuate', cmd: 'set', device: device, node: node, property: property, value: value, parse: parse}, function(err) {
		if (err) {
			res.json({result: 'an error ocurred on our servers'});
		}
		else {
			res.json({result: 'value set'});
		}
		res.end();
	});
});

// 404 error
router.all('*', (req, res) => {
  res.status(404);
  res.json({result: "resource not found"});
  res.end();
});

module.exports = router;
