'use strict';


module.exports = function(sequelize, DataTypes) {

	var Projection = sequelize.define('Projection', {
			dateTime: DataTypes.DOUBLE,
			is3D: DataTypes.BOOLEAN,
			helper: DataTypes.ENUM('subtitles', 'dubbing', 'lector')
		},
		{
			associate: function(models){
				Projection.belongsToMany(models.Place, { through: models.ProjectionPlace });
				Projection.belongsTo(models.Movie);
			}
		}
	);


	return Projection;
};