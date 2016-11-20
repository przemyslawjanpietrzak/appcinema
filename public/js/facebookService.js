angular
	.module('facebookService.module', [])
	.factory('facebookService', function($q) {
		return {
			getMyLastName: function() {
				var deferred = $q.defer();
				FB.api('/me', {
					fields: 'last_name'
				}, function(response) {
					if (!response || response.error) {
						deferred.reject(response);
					} else {
						deferred.resolve(response);
					}
				});
				return deferred.promise;
			}
		}
	})
	.service('facebookInit', function ($q) {
		return function () {
			var promise = $q.defer();
			window.fbAsyncInit = function() {
				FB.init({
					appId      : '1240794239325485', // App ID
					channelUrl : '//' + window.location.host + '/channel.html', // Channel File
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					xfbml      : true,  // parse XFBML
					frictionlessRequests: true
				});

				// Make sure the user is logged in and redirect if needed
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						promise.resolve(response);
					} else {
						promise.reject(response);
					}
				});
			};
			return promise.promise
		}
	});
