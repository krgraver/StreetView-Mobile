angular.module('auth.controller', [])
	.controller('AuthenticationController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.newUser = {};
		$scope.userInfo = {};
		$scope.login = {};

		// User Registration

		$scope.createUser = function() {
			$http.post('/api/user/signup', $scope.newUser).success(function(response) {
				localStorage.setItem('User-Data', JSON.stringify(response));
				$state.go('setup');
			}).error(function(err) {
				console.error(err);
			});
		}

		// User Login

		$scope.logUserIn = function() {
			$http.post('/api/user/login', $scope.login).success(function(response) {
				localStorage.setItem('User-Data', JSON.stringify(response));
				$state.go('tab.views-map');
			}).error(function(err) {
				console.error(err);
			});
		}

	}]);