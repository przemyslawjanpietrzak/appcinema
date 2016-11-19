angular
	.module('dashboard.state.service', [])
	.service('stateService', function () {
			var getInitalState = function () {
				return {
					user: null,
					movie: null,
					unreducedTicketsCount: 0,
					reducedTicketsCount: 0,
					places: [],
					selectedPlaces: [],
					isReservationConfirm: false
				};
			};

			var state = getInitalState();

			return {
				getUser: function () {
					return state.user;
				},
				setUser: function (user) {
					return state.user = user;
				},

				getMovie: function () {
					return state.movie;
				},
				setMovie: function (movie) {
					return state.movie = movie;
				},

				getUnreducedTicketsCount: function () {
					return state.unreducedTicketsCount;
				},
				getReducedTicketsCount: function () {
					return state.reducedTicketsCount;
				},
				setTicketsCount: function (reducedTicketsCount, unreducedTicketsCount) {
					state.unreducedTicketsCount = unreducedTicketsCount;
					state.reducedTicketsCount = reducedTicketsCount;
				},

				getPlaces: function () {
					return state.places;
				},
				setPlaces: function (places) {
					state.places = places;
				},

				reset: function () {
					state = getInitalState();
				}
			}
		});