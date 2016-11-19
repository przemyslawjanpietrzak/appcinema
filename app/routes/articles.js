'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users');
var articles = require('../../app/controllers/articles');

module.exports = function(app) {

	app.route('/articles')
	    .get(articles.all)
	    .post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
	    .get(articles.show)
	    .put(users.requiresLogin, articles.hasAuthorization, articles.update)
	    .delete(users.requiresLogin, articles.hasAuthorization, articles.destroy);

	app.param('articleId', articles.article);
};

