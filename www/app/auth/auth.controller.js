angular.module('auth.controller', [])
	.controller('AuthenticationController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.newUser = {};
		$scope.userInfo = {};

		$scope.createUser = function() {
			console.log($scope.newUser);
			$http.post('/api/user/signup', $scope.newUser);
		};

		$scope.updateUser = function() {
			console.log($scope.userInfo);
		}

	}]);