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

		$scope.pictureSourceType = {};
		$scope.destinationType = {};

		document.addEventListener("deviceready", $scope.onDeviceReady, false);

		$scope.onDeviceReady = function() {
			$scope.pictureSourceType = navigator.camera.PictureSourceType;
			$scope.destinationType = navigator.camera.DestinationType;
		}

		$scope.onPhotoDataSuccess = function() {
			console.log("Open camera");
		}

		$scope.onFail = function(err) {
			console.error(err);
		}

		$scope.capturePhoto = function() {
			console.log("function is firing");
			navigator.camera.getPicture($scope.onPhotoDataSuccess, onFail, {});
		}

	}]);