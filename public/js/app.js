angular
	.module('root', [
		'ngCookies',
		'ngResource',
		'ui.router',
		'ui.bootstrap',
		'ui.route',
		'satellizer',
		'angularFblogin',
		'btford.socket-io',

		'facebookService.module',
		'login',
		'dashboard'
	])
	.constant('_', window._)
	.config(function ($urlRouterProvider, $authProvider) {
			$urlRouterProvider.otherwise("/login");
	})
	.run(function ($window, $state, facebookInit) {
		facebookInit().then(
			function (response) {
				console.log(response);
				$state.go('dashboard');
			},
			function (response) {
				console.error(response);
				$state.go('login');
			}
		)
	});

