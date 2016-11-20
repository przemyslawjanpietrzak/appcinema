angular
	.module('dashboard.movieList', [])
	.controller('dashboard.movieList.controller', function ($scope, $http, _) {
		var parseResponse = function (response) {
			return _.map(response.data, function (projection) {
				return {
					title: projection.Movie.title,
					type: projection.Movie.type,
					is3D: projection.is3D,
					id: projection.Movie.id,
					helper: projection.helper
				}
			});
		};

		$scope.movies = [];
		$http({ method: 'get', url: '/projection' }).then(function (response) {
			$scope.movies = parseResponse(response);
		});

		$scope.searchMovies = function (title, type, is3D) {
			var searchData = {
				title: title,
				type: type,
				is3D: is3D ? 1 : 0
			};
			$http({ method: 'get',  url: '/projection', params: searchData }).then(function (response) {
				$scope.movies = parseResponse(response);
			});
		};

		$scope.moviesTypes = ['subtitles', 'dubbing', 'lector']; // TODO get from settings

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
					      <div class="panel-heading">Search</div>
					        <div class="panel-body">
					         <form ng-submit="searchMovies(title, type, is3D)">
									  <div class="form-group">
									    <label for="exampleInputEmail1">Title</label>
									    <input type="text" class="form-control" placeholder="Title" ng-model="title">
									  </div>
									  <div class="form-group">
									    <label for="exampleInputPassword1">Helper</label>
									    <select class="form-control"  ng-model="type" ng-options="type for type in moviesTypes"></select>
									  </div>
									  <div class="form-group">
									    <label for="exampleInputFile">id 3D</label>
									    <input class="form-control"  type="checkbox" ng-model="is3D">
									  </div>
									  <button type="submit" class="btn btn-success">Search</button>
									</form>
					        </div>
					      </div>
					    </div>
					  <div class="col-md-9">
					  <div class="panel panel-default">
						  <div class="panel-heading">Panel heading</div>
						  <div class="panel-body">
						    <p>Some Text</p>
						  </div>
              <movies movies="movies"></movies>
						</div>
					</div>
				`
			})
	});