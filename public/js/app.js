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
		$authProvider.twitter({
			url: '/auth/twitter',
			authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
			redirectUri: 'http://localhost:3000/auth/twitter/callback',
			oauthType: '1.0',
			popupOptions: {width: 495, height: 645}
		});

		$authProvider.google({
			clientId: 'your google client id here', // google client id
			url: '/auth/google',
			redirectUri: 'http://localhost:3000/auth/google/callback'
		});

		$urlRouterProvider.otherwise("/login");
	})
	.run(function ($window, $state, facebookInit) {
		facebookInit().then(
			function (response) {
				console.log(response);
				$state.go('dashboard.movieList');
			},
			function (response) {
				console.error(response);
				$state.go('login');
			}
		)
	});

