angular
	.module('dashboard.cinemaPlan', [])
	.service('getCinemaPlan', function ($http, _, socketService) {
		var rowsCount = 12;
		var colsCount = 12;
		var getPlaceStatus = function (result, rowIndex, colIndex, takedPlaces) {
			var isPlaceTaken = _.find(takedPlaces, function (place) {
				return String(place.col) === String(colIndex) && String(place.row) === String(rowIndex) && place.movieId === place.movieId;
			});
			var placeStatus = result.data.Places[rowIndex * rowsCount + colIndex].ProjectionPlace.status;

			return isPlaceTaken ? 'boocked' : placeStatus;
		};

		// TODO add some docs
		return function (movieId, cb) {
			var plan = [];
			var takedPlaces = socketService.getMovieTakedPlaces(movieId);

			$http.get('/projection/' + movieId).then(function (result) {
				for (var colIndex = 0; colIndex < colsCount; colIndex++) {
					plan.push([]);
					for (var rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
						plan[colIndex].push(
							getPlaceStatus(result, rowIndex, colIndex, takedPlaces)
						);
					}
				}
				cb({
					plan: plan,
					rows: _.range(rowsCount),
					cols: _.range(colsCount)
				});
			});
		}
	})
	.controller('dashboard.cinemaPlan.controller', function (
		$scope,
		$http,
		$state,
		_,
		stateService,
		mySocket,
		socketService,
		getCinemaPlan
	) {
		var selectedPlaces = [];
		var movieId = stateService.getMovie().id;
		var user = stateService.getUser();

		$scope.ticketLeftCount = stateService.getUnreducedTicketsCount() + stateService.getReducedTicketsCount();

		getCinemaPlan(movieId, function (result) {
			$scope.plan = result.plan;
			$scope.rows = result.rows;
			$scope.cols = result.cols;
		});

		socketService.setRemoveFreePlaceHandler(function (data) {
			if (data.user.id !== user.id && data.movieId === movieId) {
				$scope.plan[data.col][data.row] = 'boocked';
			}
		});

		socketService.setAddFreePlaceHandler(function (data) {
			if (data.user.id !== user.id && data.movieId === movieId) {
				$scope.plan[data.col][data.row] = 'free';
			}
		});

		$scope.placeClickHandler = function (col, row) {
			if ($scope.plan[col][row] === 'free') {
				selectedPlaces.push({row: row, col: col});
				$scope.plan[col][row] = 'taken';
				$scope.ticketLeftCount--;
				socketService.emitTakePlaceEvent(col, row, user, movieId);
			} else {
				$scope.plan[col][row] = 'free';
				$scope.ticketLeftCount++;
				socketService.emitUntakePlaceEvent(col, row, user, movieId);
			}
		};

		$scope.disabledButton = function (plan, col, row) {
			return $scope.plan[col][row] === 'boocked' || ($scope.ticketLeftCount === 0 && $scope.plan[col][row] === 'free')
		};

		$scope.goNext = function () {
			stateService.setPlaces(selectedPlaces);
			$state.go('dashboard.confirm');
		};
	})
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard.cinemaPlan', {
				url: '/cinemaPlan',
				controller: 'dashboard.cinemaPlan.controller',
				template: `
					<div>
						<h3>Tickets to select: {{ ticketLeftCount }}</h3><hr>
						<span class="ac-screen"><h6>Screen</h6></span>
						<hr>
					  <div class="ac-row row" ng-repeat="col in cols track by $index">
					  	<div class="col-md-1" ng-repeat="row in rows track by $index">
					  		<button
					  			class="btn"
					  			ng-class="{ 'btn-success': plan[col][row] === 'free', 'btn-default': plan[col][row] === 'booked',  'btn-info': plan[col][row] === 'taken'}"
					  			ng-click="placeClickHandler(col, row)"
					  			ng-disabled="disabledButton(plan, col, row)"
								>{{ plan[col][row] }}</button>
							</div>
						</div>
						<button class="btn btn-primary" ng-show="ticketLeftCount === 0" ng-click="goNext()">Next</button>	
					</div>
				`
			})
	});