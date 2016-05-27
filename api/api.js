'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use('/api/v1/', require('./routes'));

http.listen(process.env.CONTROL_PORT, function(){
	console.log('listening on *:' + process.env.CONTROL_PORT);
});