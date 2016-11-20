module.exports = function(sequelize, DataTypes) {

	var ProjectionPlace = sequelize.define('ProjectionPlace', {
		status: {
			type:	DataTypes.STRING,
			defaultValue: 'free'
		}
	});
	
	return ProjectionPlace;
};