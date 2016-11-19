
angular
	.module('dashboard.state.service', [])
	.service('stateService', function () {
		var state = {
			user: null,
			movie: null,
			unreducedTicketsCount: 0,
			reducedTicketsCount: 0,
			places: [],
			selectedPlaces: [],
			isReservationConfirm: false,
		};

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

			getTicketsCount: function () {
				return state.unreducedTicketsCount + state.unreducedTicketsCount;
			},
			setTicketsCount: function (reducedTicketsCount, unreducedTicketsCount) {
				state.unreducedTicketsCount = unreducedTicketsCount;
				state.reducedTicketsCount = reducedTicketsCount;

				return {
					unreducedTicketsCount: state.unreducedTicketsCount,
					unreducedTicketsCount: state.unreducedTicketsCount
				};
			},

			getPlaces: function () {
				return state.places;
			},
			setPlaces: function (places) {
				state.places = places;
			}

		}
	});