'use strict';


module.exports = function(sequelize, DataTypes) {

	var Projection = sequelize.define('Projection', {
			dateTIme: DataTypes.INTEGER,
			is3D: DataTypes.BOOLEAN,
			helper: DataTypes.ENUM('subtitles', 'dubbing', 'lector')
		},
		{
			associate: function(models){
				Projection.hasMany(models.Place, {as: 'places'});
				Projection.belongsTo(models.Movie);
			}
		}
	);


	return Projection;
};
