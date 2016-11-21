angular
	.module('dashboard', [
		'dashboard.state.service',
		'socketService.module',
		
		'dashboard.moviesComponent.module',

		'dashboard.movieList',
		'dashboard.movieItem',
		'dashboard.cinemaPlan',
		'dashboard.confirm.module'
	])
	.factory('mySocket', function (socketFactory) {
		return socketFactory();
	})
	.controller('dashboard.controller', function ($state, facebookService, stateService) {
		facebookService.getMyLastName()
			.then(function(response) {
					stateService.setUser(response);
					$state.go('dashboard.movieList');
				}, function () {
					stateService.setUser(null);
					$state.go('login');
				}
			);
	})
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				controller: 'dashboard.controller',
				template: `
					<content>
						<header class="page-header">
							<h1>App Cinema</h1>
						</header>
						<ui-view />
					</content>
				`,
			})
	});


