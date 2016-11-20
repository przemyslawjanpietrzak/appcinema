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
			return res.jsonp(movie);
		}
	});
};

exports.movies = function(req, res) {
	db.Movie.findAll({
		attributes: {
			include: ['title', 'type']
		}
	}).then(function (movies) {
		return res.jsonp(movies);
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.movie.User.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};
