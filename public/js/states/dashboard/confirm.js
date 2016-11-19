angular
	.module('dashboard.confirm.module', [])
	.controller('dashboard.confirm.module', function ($scope, stateService) {
		var ticketsCount = stateService.getTicketsCount();

		$scope.reducedTicketsCount = ticketsCount.reducedTicketsCount();
		$scope.unreducedTicketsCount = ticketsCount.unreducedTicketsCount();
		$scope.places = stateService.getPlaces();
		$scope.movie = stateService.getMovie();
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
								<tr ng-repeat="movie in movies track by $index" ui-sref="dashboard.movieItem({ movieId: movie.id })">
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
								<tr ng-repeat="movie in movies track by $index" ui-sref="dashboard.movieItem({ movieId: movie.id })">
									<th>{{ reducedTicketsCount }}</th>
									<th>{{ unreducedTicketsCount }}</th>
									<th>{{ places }}</th>
								</tr>
							</tbody>
					  </table>
					</div>
				</div>
			`
		})
	});