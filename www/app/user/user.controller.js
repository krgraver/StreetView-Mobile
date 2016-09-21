angular.module('app')
	.controller('UserController', ['$scope', '$state', '$http', '$cordovaCamera', '$cordovaEmailComposer', '$ionicPopup',
		function($scope, $state, $http, $cordovaCamera, $cordovaEmailComposer, $ionicPopup) {

		// Account setup

		$scope.user = {};

		$scope.addUserInfo = function() {
			var user = firebase.auth().currentUser;

			if (!$scope.user.displayName) {
				var alertPopup = $ionicPopup.alert({
			     	title: 'Missing Info!',
			     	template: 'Please enter a display name'
			   	});
			   	alertPopup;
			} else if (!$scope.user.photoURL) {
				var alertPopup = $ionicPopup.alert({
			     	title: 'Missing Info!',
			     	template: 'Please create an avatar'
			   	});
			   	alertPopup;
			} else {
				user.updateProfile({
				  	displayName: $scope.user.displayName,
				  	photoURL: $scope.user.photoURL
				});
				$state.go('tab.views-map');
			}
		}

		// Take Profile picture

		$scope.getProfilePic = function () {
	
	    	var options = {
		        quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                encodingType: navigator.camera.EncodingType.JPEG,
                allowEdit: true,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
	    	};

	    	$cordovaCamera.getPicture(options).then(function(imageData) {
	        	$scope.user.photoURL = "data:image/jpeg;base64," + imageData;
	    	}, function(err) {
	        	console.log(err);
	    	});
	    }; 

		// Show info in profile

		$scope.showProfile = function() {
			var user = firebase.auth().currentUser;
			$scope.displayName = user.displayName;
			$scope.photoURL = user.photoURL;

			$scope.$broadcast('scroll.refreshComplete');
		}

		// Open Email app on "Contact StreetView" button press

		$scope.sendEmail = function() {
			cordova.plugins.email.open({
				to: 'kelly@snapmobile.io',
    			subject: 'Hello StreetView!'
			});
		}

		// Save user info

		$scope.updateUser = function() {
			var user = firebase.auth().currentUser;

			user.updateProfile({
			  	displayName: $scope.user.displayName,
			  	photoURL: $scope.user.photoURL
			});
			$state.go('tab.profile');
		}

		// Log User out

		$scope.logUserOut = function() {
			firebase.auth().signOut()
				.then(function() {
			  		$state.go('login');
				}, function(error) {
			  		console.log(error);
				});
		}

	}]);