angular
	.module('dashboard.cinemaPlan', [])
	.controller('dashboard.cinemaPlan.controller', function ($scope, $state,  _, stateService) {
		var selectedPlaces = [];

		$scope.rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		$scope.cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
		$scope.ticketLeftCount = stateService.getUnreducedTicketsCount() + stateService.getReducedTicketsCount();

		var plan = {};
		_.forEach($scope.cols, function (col) {
			var line = {};
			_.forEach($scope.rows, function (row) {
				line[row] = 'free'
			});
			plan[col] = line;
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

		$scope.disabledButton = function(col, row) {
			return plan[col][row] === 'bought' || ($scope.ticketLeftCount === 0 && plan[col][row] === 'free')
		};

		$scope.goNext = function () {
			stateService.setPlaces(selectedPlaces);
			$state.go('dashboard.confirm');
		};

		$scope.plan = plan;
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
					  			ng-disabled="disabledButton(col, row)"
								>{{ plan[col][row] }}</button>
							</div>
						</div>
					</div>
				`
			})
	});