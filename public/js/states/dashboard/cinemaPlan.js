angular
	.module('dashboard.cinemaPlan', [])
	.controller('dashboard.cinemaPlan.controller', function ($scope, $http, $state,  _, stateService) {

		var rowsCount = 12;
		var colsCount = 12;
		var selectedPlaces = [];
		var movieId = stateService.getMovie();

		var plan = [];
		$scope.ticketLeftCount = stateService.getUnreducedTicketsCount() + stateService.getReducedTicketsCount();



		$http.get('/projection/' + movieId).then(function (result) {

			for (var c = 0; c < colsCount; c++) {
				plan.push([]);
				for (var r = 0; r < rowsCount; r++) {
					plan[c].push(
						result.data.Places[r*rowsCount + c].ProjectionPlace.status
					);
				}
			}


			$scope.plan = plan;
			$scope.rows  = _.range(rowsCount);
			$scope.cols  = _.range(colsCount);
			return plan;
		});

		$scope.placeClickHandler = function (col, row) {
			if (plan[col][row] === 'free') {
				selectedPlaces.push({ row: row, col: col });
				plan[col][row] = 'boocked';
				$scope.ticketLeftCount--;
			} else {
				plan[col][row] = 'free';
				$scope.ticketLeftCount++;
			}
		};

		$scope.disabledButton = function(plan, col, row) {
			return plan[col][row] === 'bought' || ($scope.ticketLeftCount === 0 && plan[col][row] === 'free')
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
					  			ng-class="{ 'btn-success': plan[col][row] === 'free', 'bnt-danger': plan[col][row] === 'bought', 'btn-default': plan[col][row] === 'booked'}"
					  			ng-click="placeClickHandler(col, row)"
					  			ng-disabled="disabledButton(plan, col, row)"
								>{{ plan[col][row] }}</button>
							</div>
						</div>
					</div>
				`
			})
	});