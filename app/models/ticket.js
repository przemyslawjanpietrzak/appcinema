
module.exports = function(sequelize, DataTypes) {

	var Ticket = sequelize.define('Ticket', {
		isReduced: DataTypes.BOOLEAN
	},
		{
			associate: function(models){
				Ticket.belongsTo(models.Projection);
			}
		}
	);


	return Ticket;
};
