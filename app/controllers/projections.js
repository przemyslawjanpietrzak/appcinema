'use strict';


var db = require('../../config/sequelize');


exports.projection = function (req, res, next, id) {
	db.Projection.find({
		where: {id: id}
	}).then(function (projection) {
		if (!projection) {
			return next(new Error(`Projection doesn't exist` + id));
		} else {
			req.projection = projection;
			return res.jsonp(projection);
		}
	});
};

exports.projections = function (req, res) {
	
	db.Projection.findAll({
		include: [{
			model: db.Place,
			through: {
				attributes: ['row', 'col', 'status'],
			}
		}, {
			model: db.Movie,
		}]
	}).then(function (projections) {
		return res.jsonp(projections);
	});
};

exports.hasAuthorization = function (req, res, next) {
	if (req.projection.User.id !== req.user.id) {
		return res.send(401, 'User is not authorized');
	}
	next();
};
