angular
	.module('dashboard', [
		'dashboard.state.service',
		
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
		stateService.setUser(Math.random()); // TODO

		facebookService.getMyLastName()
			.then(function(response) {
					console.log('fb, re', response);
				}, function (response) {
					console.error('fb, re', response);
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
							<h1>Example page header <small>Subtext for header</small></h1>
						</header>
						<ui-view />
					</content>
				`,
			})
	});


