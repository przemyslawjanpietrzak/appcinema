angular
	.module('dashboard', ['dashboard.state.service', 'dashboard.movieList', 'dashboard.movieItem', 'dashboard.cinemaPlan', 'dashboard.confirm.module'])
	.controller('dashboard.controller', function () {

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


