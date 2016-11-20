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

	var searchParams = {};
	if (req.param('title')) {
		searchParams.title = req.param('title')
	}
	if (req.param('is3D')) {
		searchParams.is3D = req.param('is3D')
	}
	if (req.param('type')) {
		searchParams.type = req.param('type')
	}
	if (req.param('helper')) {
		searchParams.helper = eq.param('helper')
	}

	db.Projection.findAll({
		include: [{
			model: db.Movie,
			attributes: ['title'],
			where: searchParams
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
		}
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
