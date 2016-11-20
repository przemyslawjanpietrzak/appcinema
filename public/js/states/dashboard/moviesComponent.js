angular
	.module('dashboard.moviesComponent.module', [])
	.controller('dashboard.movieComponent.controller', function () {
		var ctrl = this;
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
						<tr ng-repeat="movie in $ctrl.movies track by $index" ui-sref="dashboard.movieItem({ movieId: movie.id })">
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