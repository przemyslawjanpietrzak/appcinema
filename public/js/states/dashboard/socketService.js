angular
	.module('socketService.module', [])
	.service('socketService', function (_, mySocket) {
		var takedPlaces = [];
		var removeFreePlaceHandler = function () {};
		var addFreePlaceHandler = function () {};

		mySocket.on('removeFreePlace', function (data) {
			takedPlaces.push(data);
			removeFreePlaceHandler(data);
		});

		mySocket.on('addFreePlace', function (data) {
			_.remove(takedPlaces, function (place) {
				return place.row === data.row && place.col === data.col && place.movieId === data.movieId;
			});
			addFreePlaceHandler(data);
		});

		mySocket.on('takedPlaces', function (initailTakedPlace) {
			takedPlaces = initailTakedPlace;
		});

		return {
			setAddFreePlaceHandler: function (handler) {
				addFreePlaceHandler = handler;
			},
			setRemoveFreePlaceHandler: function (handler) {
				removeFreePlaceHandler = handler;
			},
			getMovieTakedPlaces: function (movieId) {
				return _.filter(takedPlaces, { movieId: movieId });
			},
			emitTakePlaceEvent: function (col, row, user, movieId) { // TODO get user from state
				mySocket.emit('bookPlace', { col: col, row: row, user: user, movieId: movieId });
			},
			emitUntakePlaceEvent: function (col, row, user, movieId) { // TODO get user from state
				mySocket.emit('unbookPlace', { col: col, row: row, user: user, movieId: movieId });
			}
		}
	});