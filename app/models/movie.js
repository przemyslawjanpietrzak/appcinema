'use strict';

module.exports = function(sequelize, DataTypes) {

	var Movie = sequelize.define('Movie', {
			title: DataTypes.STRING,
			type: DataTypes.ENUM('comedy', 'horror', 'drama', 'thriler', 'sci-fi')
		}
	);

	return Movie;
};
