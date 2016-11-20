'use strict';


var db = require('../../config/sequelize');


exports.projection = function (req, res, next, id) {

	db.Projection.findOne({
		where: { id: id },
		include: [{
			model: db.Place,
			through: {
				attributes: ['row', 'col', 'status'],
			}
		}, {
			model: db.Movie,
			attributes: ['title']
		}]
	}).then( function (projection) {
		return res.jsonp(projection);
	})
};

exports.projections = function (req, res) {

	var projectionSearchParams = {};
	var movieSearchParams = {};
	if (req.param('title')) {
		movieSearchParams.title = req.param('title')
	}
	if (req.param('is3D')) {
		projectionSearchParams.is3D = req.param('is3D')
	}
	if (req.param('type')) {
		movieSearchParams.type = req.param('type')
	}
	if (req.param('helper')) {
		projectionSearchParams.helper = eq.param('helper')
	}

	db.Projection.findAll({
		where: projectionSearchParams,
		order: 'dateTime',
		include: [{
			model: db.Movie,
			attributes: ['title', 'type', 'id'],
			where: movieSearchParams
		}]
	}).then(function (projections) {
		return res.jsonp(projections);
	});
};

exports.bookSpaces = function (req, res, next, id) {
	db.ProjectionPlace.findOne({
		where: {
			ProjectionId: id,
			row: req.body.row,
			col: req.body.row
		},
		include: [{
			model: db.Movie,
			attributes: ['title', 'type']
		}]
	}).then(function (projectionPlace) {
		return projectionPlace.update({ status: 'boocked', });
	})
	.then(function () {
		return res.status(204).send();
	})
};

exports.hasAuthorization = function (req, res, next) {
	if (req.projection.User.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};
