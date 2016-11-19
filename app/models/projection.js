
module.exports = function(sequelize, DataTypes) {

	var Projection = sequelize.define('Projection', {
			dateTIme: DataTypes.INTEGER,
			is3D: DataTypes.BOOLEAN,
			helper: DataTypes.ENUM('subtitles', 'dubbing', 'lector')
		}
	);


	return Projection;
};
