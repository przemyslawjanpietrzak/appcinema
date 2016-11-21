angular
	.module('dashboard.moviesComponent.module', [])
	.controller('dashboard.movieComponent.controller', function ($state, stateService) {
		var ctrl = this;

		ctrl.chooseMovie = function (movie) {
			stateService.setMovie(movie);
			$state.go('dashboard.movieItem', { movieId: movie.id });
		}
	})
	.component('movies', {
			controller: 'dashboard.movieComponent.controller',
			bindings: {
				movies: '<',
			},
			template: `
				<table class="table">
			    <thead>
				    <tr>
				      <th>Title</th>
				      <th>3D</th>
				      <th>Type</th>
				      <th>Helper</th>
				      <th>Date</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="movie in $ctrl.movies track by $index" ng-click="$ctrl.chooseMovie(movie)">
							<th>{{ movie.title }}</th>
							<th>{{ movie.is3D ? 'yes' : 'no' }}</th>
							<th>{{ movie.type }}</th>
							<th>{{ movie.helper }}</th>
							<th>{{ movie.dateTime | date:'yyyy-MM-dd HH:mm:ss' }}</th>
						</tr>
					</tbody>
			  </table>
			`
		}
	);