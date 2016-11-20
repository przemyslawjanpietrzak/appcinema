angular
	.module('dashboard.cinemaPlan', [])
	.service('getCinemaPlan', function ($http) {
		var rowsCount = 12;
		var colsCount = 12;

		return function (movieId, cb) {
			var plan = [];

			$http.get('/projection/' + movieId).then(function (result) {
				for (var c = 0; c < colsCount; c++) {
					plan.push([]);
					for (var r = 0; r < rowsCount; r++) {
						plan[c].push(
							result.data.Places[r*rowsCount + c].ProjectionPlace.status
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
	.controller('dashboard.cinemaPlan.controller', function ($scope, $http, $state,  _, stateService, mySocket, getCinemaPlan) {
		var selectedPlaces = [];
		var movieId = stateService.getMovie();
		var user = stateService.getUser();

		$scope.ticketLeftCount = stateService.getUnreducedTicketsCount() + stateService.getReducedTicketsCount();

		getCinemaPlan(movieId, function (result) {
			$scope.plan = result.plan;
			$scope.rows = result.rows;
			$scope.cols = result.cols;
		});

		mySocket.on('removeFreePlace', function (data) {
			if (data.user !== user && data.movieId === movieId) {
				$scope.plan[data.col][data.row] = 'boocked';
			}
		});

		mySocket.on('addFreePlace', function (data) {
			if (data.user !== user && data.movieId === movieId) {
				$scope.plan[data.col][data.row] = 'free';
			}
		});

		$scope.placeClickHandler = function (col, row) {

			if ($scope.plan[col][row] === 'free') {
				selectedPlaces.push({ row: row, col: col });
				$scope.plan[col][row] = 'taken';
				$scope.ticketLeftCount--;
				mySocket.emit('bookPlace', { col: col, row: row, user: user, movieId: movieId });
			} else {
				$scope.plan[col][row] = 'free';
				$scope.ticketLeftCount++;
				mySocket.emit('unbookPlace', { col: col, row: row, user: user, movieId: movieId });
			}
		};

		$scope.disabledButton = function(plan, col, row) {
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
						<span>ticketLeftCount = {{ ticketLeftCount }}</span>
						<button class="btn-info" ng-show="ticketLeftCount === 0" ng-click="goNext()">Next</button>
					  <div class="row" ng-repeat="col in cols track by $index">
					  	<div class="col-md-1" ng-repeat="row in rows track by $index">
					  		<button
					  			class="btn"
					  			ng-class="{ 'btn-success': plan[col][row] === 'free', 'bnt-danger': plan[col][row] === 'bought', 'btn-default': plan[col][row] === 'booked',  'btn-info': plan[col][row] === 'taken'}"
					  			ng-click="placeClickHandler(col, row)"
					  			ng-disabled="disabledButton(plan, col, row)"
								>{{ plan[col][row] }}</button>
							</div>
						</div>
					</div>
				`
			})
	});