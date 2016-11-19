'use strict';

var	movies = require('../../app/controllers/movies');

module.exports = function(app) {
	app.route('/movies')
		.get(movies.movies);

	app.route('/movies/:movieId')
		.get(movies.movie);

	app.param('movieId', movies.movie);
};

