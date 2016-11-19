'use strict';

module.exports = function(sequelize, DataTypes) {

	var Place = sequelize.define('Place', {
			row: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
			col: DataTypes.ENUM('a', 'b', 'c', 'd', 'e', 'f', 'g',),
			status: DataTypes.ENUM('free', 'reserved', 'during-reservation'),
		}
	);

	return Place;
};
