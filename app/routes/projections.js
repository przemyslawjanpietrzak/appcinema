'use strict';

var	projections = require('../../app/controllers/projections');

module.exports = function(app) {
	app.route('/projection')
		.get(projections.projections);

	app.route('/projection/:projectionId')
		.get(projections.projection);

	app.param('projectionId', projections.projection);
};

