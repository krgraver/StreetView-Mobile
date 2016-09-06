angular.module('auth.controller', [])
	.controller('AuthenticationController', ['$scope', '$state', '$http', 'constant', function($scope, $state, $http, constant) {

		$scope.newUser = {};
		$scope.login = {};

		// User Registration

		$scope.createUser = function() {
			$http.post(constant.API_BASE_URL + '/api/user/signup', $scope.newUser)
			.success(function(response) {
				if (response === "success") {
					$state.go('setup');
				} else {
					$scope.error = response;
				}
			}).error(function(err) {
				console.log(err);
			});
		}

		// User Login

		$scope.logUserIn = function() {
			$http.post(constant.API_BASE_URL + '/api/user/login', $scope.login)
			.success(function(response) {
				if (response === "authenticated") {
					$state.go('tab.views-map');
				} else {
					$scope.error = response;
				}
			}).error(function(err) {
				console.log(err);
			});
		}
	}]);