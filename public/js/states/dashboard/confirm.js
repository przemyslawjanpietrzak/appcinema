angular
	.module('dashboard.confirm.module', [])
	.controller('dashboard.confirm.controller', function ($scope, $http, $state, _, stateService) {


		$scope.reducedTicketsCount = stateService.getUnreducedTicketsCount();
		$scope.unreducedTicketsCount = stateService.getReducedTicketsCount();
		$scope.places = stateService.getPlaces();
		$scope.movies = [stateService.getMovie()];

		$scope.confirm = function () {
			$http.put('/projection/update', {
				id: '1',
				col: _.map($scope.places, function (place) {
					return String(place.col);
				}),
				row:_.map($scope.places, function (place) {
					return String(place.row);
				})
			}).then(function () {
				stateService.reset();
				$state.go('dashboard.movieList');
			});

		}
	})
	.config(function ($stateProvider) {
	$stateProvider
		.state('dashboard.confirm', {
			url: '/confirm',
			controller: 'dashboard.confirm.controller',
			template: `
				<div class="row">
					<div>
						<movies movies="movies"></movies>
					</div>
					<div>
						<table class="table">
					    <thead>
						    <tr>
						      <th>reducedTicketsCount</th>
						      <th>unreducedTicketsCount</th>
						      <th>Helper</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>{{ reducedTicketsCount }}</th>
									<th>{{ unreducedTicketsCount }}</th>
									<th>{{ places }}</th>
								</tr>
							</tbody>
					  </table>
					</div>
					<button class="btn btn-success" ng-click="confirm()">Confirm</button>
				</div>
			`
		})
	});