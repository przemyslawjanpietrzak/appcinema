'use strict';


var db = require('../../config/sequelize');


exports.movie = function(req, res, next, id) {
	db.Movie.find({
		where: { id: id }
	}).then(function(movie){
		if(!movie) {
			return next(new Error(`Movie doesn't exist` + id));
		} else {
			req.movie = movie;
			return next();
		}
	}).catch(function(err){
		return next(err);
	});
};

exports.movies = function(req, res, next) {
	var movies = db.Movie.findAll({});
	return res.jsonp(movies);
};

exports.hasAuthorization = function(req, res, next) {
	if (req.movie.User.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};
