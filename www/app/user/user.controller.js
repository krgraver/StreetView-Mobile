angular.module('app')
	.controller('UserController', ['$scope', '$state', '$http', 'Camera', function($scope, $state, $http,  Camera) {

		// Account setup

		$scope.user = {};

		$scope.addUserInfo = function() {
			var user = firebase.auth().currentUser;

			user.updateProfile({
			  	displayName: $scope.user.displayName,
			  	photoURL: $scope.user.photoURL
			});
			$state.go('tab.views-map');
		}

		// Take Profile picture

		$scope.getProfilePic = function (options) {
	
	    	var options = {
		        quality : 75,
		        targetWidth: 200,
		        targetHeight: 200,
		        sourceType: 1
	    	};

	    	Camera.getPicture(options).then(function(imageData) {
	        	$scope.user.photoURL = imageData;;
	    	}, function(err) {
	        	console.log(err);
	    	});
	    }; 

		// Show info in profile

		$scope.showProfile = function() {
			var user = firebase.auth().currentUser;
			$scope.displayName = user.displayName;
			$scope.photoURL = user.photoURL;
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