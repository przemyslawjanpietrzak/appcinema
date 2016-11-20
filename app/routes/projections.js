'use strict';

var projections = require('../../app/controllers/projections');
var db = require('../../config/sequelize');

module.exports = function (app) {
	app.route('/projection')
		.get(projections.projections);

	app.route('/projection/:projectionId')
		.get(projections.projection);

	app.put('/projection/update', function (req, res, id) {
		var projectionId;
		var placeId;
		db.Place.find({
			where: { col: req.body.col, row: req.body.row }
		})
		.then(function (place) {
			placeId = place.dataValues.id;
			return db.ProjectionPlace.find({
				where: { ProjectionId: 1, PlaceId: 1 },
			})
		})
		.then(function (projectionPlace) {
			projectionPlace.update({status: 'boocked'});
		})
		.then(function () {
			return res.jsonp({ status: 'ok' });
		})
	});

	app.param('projectionId', projections.projection);
}

