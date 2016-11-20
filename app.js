'use strict';


var express = require('express');
var fs = require('fs');
var http = require('http')
var io = require('socket.io')(http);

// Load Configurations
var config = require('./config/config');
var winston = require('./config/winston');

winston.info('Starting ' + config.app.name + '...');
winston.info('Config loaded: ' + config.NODE_ENV);
winston.debug('Accepted Config:', config);

var passport = require('./config/passport');
var app = express();
var http = http.Server(app);

//Initialize Express
require('./config/express')(app, passport);

//Start the app by listening on <port>
// app.listen(config.PORT);
http.listen(3000, function(){
	console.log('listening on *:3000');
});
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('xxx', function (data) {
		console.log(data);
	})
});

winston.info('Express app started on port ' + config.PORT);

//expose app
module.exports = app;
