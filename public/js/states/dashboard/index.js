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
		var myIoSocket = io.connect('/');

		var mySocket = socketFactory({
			ioSocket: myIoSocket
		});

		return mySocket;
	})
	.controller('dashboard.controller', function (mySocket) {
		mySocket.emit('xxx', { data: 1});
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
						<content>
							<ui-view />
						</content>
					</div>
				`,
			})
	});


