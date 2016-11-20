'use strict';

var express = require('express');
var flash = require('connect-flash');
var helpers = require('view-helpers');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var sessionMiddleware = require('./middlewares/session');
var config = require('./config');


module.exports = function(app, passport) {

    app.set('showStackError', true);

    app.locals.pretty = true;

   app.use(express.static(config.root + '/public'));
    
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    
    app.enable("jsonp callback");
    
    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use(sessionMiddleware);

    app.use(flash());
    
    app.use(helpers(config.app.name));
    
    app.use(passport.initialize());
    app.use(passport.session());

    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
      require(path.resolve(routePath))(app);
    });
    app.get('index',  function (req, res, next) {
            res.render('index');
    });
};
