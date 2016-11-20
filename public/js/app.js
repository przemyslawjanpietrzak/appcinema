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
	.run(function ($rootScope, $state) {
		console.log('run');
		$state.go('dashboard.movieList');
		$rootScope.$on('$locationChangeStart', function (event, nextLocation, currentLocation) {
			//your code here
		});
	});

