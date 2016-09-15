angular.module('app')
	.controller('AuthenticationController', ['$scope', '$state', '$http', 
		function($scope, $state, $http) {

		// User Registration

		$scope.newUser = {};

		$scope.createUser = function() {
			firebase.auth()
				.createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.password)
				.then(function() {
					$state.go('setup');
				})
				.catch(function(error) {
					$scope.error = error.message;
				});
		}

		// User Login

		$scope.login = {};

		$scope.logUserIn = function() {
			firebase.auth()
				.signInWithEmailAndPassword($scope.login.email, $scope.login.password)
				.then(function() {
					$state.go('tab.views-map');
				})
				.catch(function(error) {
					$scope.error = error.message;
				});
		}

		// Send password reset email

		$scope.forgot = {};

		$scope.sendResetEmail = function() {
			firebase.auth()
				.sendPasswordResetEmail($scope.forgot.email)
				.then(function() {
					$state.go('login');
				})
				.catch(function(error) {
					$scope.error = error.message;
				});
		}
	}]);