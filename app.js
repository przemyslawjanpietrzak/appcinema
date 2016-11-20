'use strict';


var express = require('express');

var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config/config');
var winston = require('./config/winston');

winston.info('Starting ' + config.app.name + '...');
winston.info('Config loaded: ' + config.NODE_ENV);
winston.debug('Accepted Config:', config);

var passport = require('./config/passport');

require('./config/express')(app, passport);

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('xxx', function (data) {
		console.log(data);
	})
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

winston.info('Express app started on port ' + config.PORT);

module.exports = app;
