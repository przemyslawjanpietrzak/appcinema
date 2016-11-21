angular
	.module('login', [])
	.factory('mySocket', function (socketFactory) {
		return socketFactory();
	})
	.controller('login.controller', function (facebookService) {
	})
	.config(function ($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				controller: 'login.controller',
				template: `
					<div class="jumbotron text-center">
				    <h1><span class="fa fa-lock"></span> Node Authentication</h1>
				    <p>Login or Register with:</p>			
				    <a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Facebook</a>
				</div>
				`
			})
	});


