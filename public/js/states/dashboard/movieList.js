angular
	.module('dashboard.movieList', [])
	.controller('dashboard.movieList.controller', function ($scope, $http) {
		$scope.movies = [];
		$http({ method: 'get', url: '/movies' }).then(function (result) {
			$scope.movies = result.data;
		});

		$scope.searchMovies = function (searchData) {
			$http({ method: 'get',  url: '/movies', params: searchData }).then(function (result) {
				$scope.movies = result.data;
			});
		};
		
	})
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard.movieList', {
				url: '/movie',
				controller: 'dashboard.movieList.controller',
				template: `
					<div class="row">
					  <div class="col-md-3">
					    <div class="panel panel-primary">
					      <div class="panel-heading">Panel heading without title</div>
					        <div class="panel-body">
					          <ul class="list-group">
					            <li class="list-group-item">Cras justo odio</li>
					            <li class="list-group-item">Dapibus ac facilisis in</li>
					            <li class="list-group-item">Morbi leo risus</li>
					            <li class="list-group-item">Porta ac consectetur ac</li>
					            <li class="list-group-item">Vestibulum at eros</li>
					          </ul>
					        </div>
					      </div>
					    </div>
					  <div class="col-md-9">
					  <div class="panel panel-default">
						  <div class="panel-heading">Panel heading</div>
						  <div class="panel-body">
						    <p>Some Text</p>
						  </div>
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
					</div>
				`
			})
	});