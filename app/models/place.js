'use strict';

module.exports = function(sequelize, DataTypes) {

	var Place = sequelize.define('Place', {
			row: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'),
			col: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'),
		}, {
			associate: function(models){
				Place.belongsToMany(models.Projection, { through: models.ProjectionPlace });
			}
	}
	);

	return Place;
};
