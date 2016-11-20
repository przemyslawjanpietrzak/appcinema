'use strict';

module.exports = function(sequelize, DataTypes) {

	var Place = sequelize.define('Place', {
			row: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'),
			col: DataTypes.ENUM('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l')
		}, {
			associate: function(models){
				Place.belongsToMany(models.Projection, { through: models.ProjectionPlace });
			}
	}
	);

	return Place;
};
