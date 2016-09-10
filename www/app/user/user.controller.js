angular.module('app')
	.controller('UserController', ['$scope', '$state', '$http', 'Camera', function($scope, $state, $http,  Camera) {

		// Account setup

		$scope.user = {};

		$scope.addUserInfo = function() {
			var user = firebase.auth().currentUser;

			user.updateProfile({
			  	displayName: $scope.user.displayName
			});
			$state.go('tab.views-map');
		}

		$scope.showProfile = function() {
			var displayName = firebase.auth().currentUser.displayName;
			$scope.displayName = displayName;
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

		// Cordova camera plugin

		$scope.getPicture = function (options) {
	
	    	var options = {
		        quality : 75,
		        targetWidth: 200,
		        targetHeight: 200,
		        sourceType: 1
	    	};

	    	Camera.getPicture(options).then(function(imageData) {
	        	$scope.picture = imageData;;
	    	}, function(err) {
	        	console.log(err);
	    	});
	    }; 

	}]);