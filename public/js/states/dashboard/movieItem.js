angular
	.module('dashboard.movieItem', [])
	.controller('dashboard.movieItem.controller', function ($scope, $http, $state, stateService) {
		var movieId = $state.params.movieId;

		$scope.movie = stateService.getMovie();
		$scope.reducedTicketsCount = stateService.getReducedTicketsCount();
		$scope.unreducedTicketsCount = stateService.getUnreducedTicketsCount();

		$scope.submitTicketFrom = function (reducedTicketsCount, unreducedTicketsCount) {
			if (reducedTicketsCount || unreducedTicketsCount) {
				$scope.errorMessage = '';
				stateService.setMovie(movieId);
				stateService.setTicketsCount(reducedTicketsCount, unreducedTicketsCount);
				$state.go('dashboard.cinemaPlan');
			} else {
				$scope.errorMessage = 'You need to choose at least one ticket'
			}

		}
	})
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard.movieItem', {
				url: '/movie/:movieId',
				controller: 'dashboard.movieItem.controller',
				template: `
					<div class="panel panel-default">
					  <div class="panel-heading">
					    <h3 class="panel-title">Choose tickets</h3>
					  </div>
					  <div class="panel-body">
					  	<div class="alert alert-danger" role="alert" ng-show="errorMessage">{{ errorMessage }}</div>	
					    <form ng-submit="submitTicketFrom(reducedTicketsCount, unreducedTicketsCount)">
					    	<div class="row">
					    		<div class="col-md-6">
					    			<div class="input-group input-group-lg">
                      <label for="">reduced tickets count</label>
										  <input type="number" class="form-control" min="0" ng-model="reducedTicketsCount">
										</div>
									</div>
					    		<div class="col-md-6">
					    			<div class="input-group input-group-lg">
					    				<label for="">unreduced tickets count</label>
									 		<input type="number" class="form-control" min="0" ng-model="unreducedTicketsCount">
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
						          <div class="input-group input-group-lg">
										    <button class="btn btn-success" type="submit">Next</button>
											</div>
										</div>
									</div>
					    	</div>
					    </form>
					  </div>
					</div>
				`
			})
	});