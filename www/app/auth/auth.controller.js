angular.module('app')
	.controller('AuthenticationController', ['$scope', '$state', '$http', '$ionicPopup',
		function($scope, $state, $http, $ionicPopup) {

		// User Registration

		$scope.newUser = {};

		$scope.createUser = function() {
			firebase.auth()
				.createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.password)
				.then(function() {
					$state.go('setup');
				})
				.catch(function(error) {
					if (error.code === 'auth/weak-password') {
						var alertPopup = $ionicPopup.alert({
					     	title: 'Oops!',
					     	template: 'You can make a better password than that!'
					   	});
					   	alertPopup;
					} else if (error.code === 'auth/email-already-in-use') {
						var alertPopup = $ionicPopup.alert({
					     	title: 'Oops!',
					     	template: 'This email already has an account'
					   	});
					   	alertPopup;
					}
				});
		}

		// User Login

		$scope.login = {};

		$scope.logUserIn = function() {
			firebase.auth()
				.signInWithEmailAndPassword($scope.login.email, $scope.login.password)
				.then(function() {
					if (!firebase.auth().currentUser.photoURL || !firebase.auth().currentUser.displayName) {
						$state.go('setup');
					} else {
						$state.go('tab.views-map');
					}
				})
				.catch(function(error) {
					if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
						var alertPopup = $ionicPopup.alert({
					     	title: 'Oops!',
					     	template: 'Incorrect email or password'
					   	});
					   	alertPopup;
					}
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
					if (error.code === 'auth/user-not-found') {
						var alertPopup = $ionicPopup.alert({
					     	title: 'Oops!',
					     	template: "That email isn't registered"
					   	});
					   	alertPopup;
					}
				});
		}
	}]);