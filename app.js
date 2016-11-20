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


var usersSockets = [];
io.on('connection', function(socket) {
	usersSockets.push(socket)
	console.log('a user connected');

	socket.emit('xxx', { a:1} );

	socket.on('bookPlace', function (place) {
		usersSockets.forEach(function (userSocket) {
			userSocket.emit('removeFreePlace', place);
		});
	});
	
	socket.on('unbookPlace', function (place) {
		usersSockets.forEach(function (userSocket) {
			userSocket.emit('addFreePlace', place);
		})
	})
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

winston.info('Express app started on port ' + config.PORT);

module.exports = app;
