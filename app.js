'use strict';


var express = require('express');

var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _  = require('lodash');

var config = require('./config/config');


var passport = require('passport');

require('./config/express')(app, passport);
require('./config/passport')(passport);



// TODO move to file
var usersSockets = [];
var takedPlaces = [];
io.on('connection', function(socket) {
	usersSockets.push(socket);
	console.log('user join');

	socket.emit('takedPlaces', takedPlaces);

	socket.on('bookPlace', function (place) {
		usersSockets.forEach(function (userSocket) {
			userSocket.emit('removeFreePlace', place);
		});
		takedPlaces.push(place);
	});
	
	socket.on('unbookPlace', function (place) {
		usersSockets.forEach(function (userSocket) {
			userSocket.emit('addFreePlace', place);
		});
		_.remove(takedPlaces, function (takedPlace) {
			return place.row === takedPlace.row && place.col === takedPlace.col && place.movieId === takedPlace.movieId;
		});
	})
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

module.exports = app;
