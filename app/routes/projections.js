'use strict';

var _ = require('lodash');
var projections = require('../../app/controllers/projections');
var db = require('../../config/sequelize');

module.exports = function (app) {
	app.route('/projection')
		.get(projections.projections);

	app.route('/projection/:projectionId')
		.get(projections.projection);

	app.put('/projection/update', function (req, res) { // TODO  move to controller
		db.Place.findAll({
			where: {
				col: { $in: req.body.col },
				row: { $in: req.body.row }
			}
		})
		.then(function (places) {
			var placesIds = places.map((place) => place.dataValues.id);
			return db.ProjectionPlace.findAll({
				where: {
					ProjectionId:  req.body.id,
					PlaceId: { $in: placesIds }
				}
			})
		})
		.then(function (projectionPlaces) {
			return projectionPlaces.map((place) => place.update({ status: 'boocked'}));
		})
		.then(function () {
			return res.jsonp({ status: 'ok' });
		})
	});

	app.param('projectionId', projections.projection);
};

