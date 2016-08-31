angular.module('user.controller', [])
	.controller('UserController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.user = JSON.parse(localStorage['User-Data']);

		// Account Setup

		$scope.addUserInfo = function() {
			console.log($scope.user);
			$http.put('/api/user/put', $scope.user).success(function(response) {
				localStorage.setItem('User-Data', JSON.stringify(response));
			}).error(function(err) {
				console.error(err);
			});
		}

		// Log User out

		$scope.logUserOut = function() {
			localStorage.clear();
			$state.go('login');
		}

		// Cordova Camera Plugin

	}]);