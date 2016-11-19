angular
	.module('dashboard.confirm.module', [])
	.controller('dashboard.confirm.controller', function ($scope, $state, stateService) {
		
		$scope.reducedTicketsCount = stateService.getUnreducedTicketsCount();
		$scope.unreducedTicketsCount = stateService.getReducedTicketsCount();
		$scope.places = stateService.getPlaces();
		$scope.movie = stateService.getMovie();

		$scope.confirm = function () {
			stateService.reset();
			$state.go('dashboard.movieList');
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
						<table class="table">
					    <thead>
						    <tr>
						    	<th>Title</th>
						      <th>3D</th>
						      <th>Type</th>
						      <th>Helper</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>{{ movie.title }}</th>
									<th>{{ movie.is3D ? 'yes' : 'no' }}</th>
									<th>{{ movie.type }}</th>
									<th>{{ movie.helper }}</th>
								</tr>
							</tbody>
					  </table>
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