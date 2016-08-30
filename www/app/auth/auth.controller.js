angular.module('auth.controller', [])
	.controller('AuthenticationController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.newUser = {};
		$scope.userInfo = {};
		$scope.login = {};

		if (localStorage['User-Data']) {
			$scope.loggedIn = true;
		} else {
			$scope.loggedIn = false;
		}

		$scope.createUser = function() {
			$http.post('/api/user/signup', $scope.newUser).success(function(response) {
				localStorage.setItem('User-Data', JSON.stringify(response));
				$scope.loggedIn = true;
			}).error(function(err) {
				console.error(err);
			});
		}

		$scope.updateUser = function() {
			
		}

		$scope.logUserIn = function() {
			$http.post('/api/user/login', $scope.login).success(function(response) {
				localStorage.setItem('User-Data', JSON.stringify(response));
				$scope.loggedIn = true;
				$state.go('tab.views-map');
			}).error(function(err) {
				console.error(err);
			});
		}

	}]);