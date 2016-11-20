'use strict';


var express = require('express');

var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config/config');


var passport = require('passport');

require('./config/express')(app, passport);
require('./config/passport')(passport);


var usersSockets = [];
io.on('connection', function(socket) {
	usersSockets.push(socket);

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

module.exports = app;
