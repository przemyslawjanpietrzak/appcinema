'use strict';

var	movies = require('../../app/controllers/movies');

module.exports = function(app) {
	app.route('/articles')
		.get(movies.movies);

	app.route('/movies/:movieId')
		.get(movies.movie);

	app.param('articleId', movies.movie);
};

