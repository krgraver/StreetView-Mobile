angular.module('user.controller', [])
	.controller('UserController', ['$scope', '$state', '$http', 'constant', 'Camera', function($scope, $state, $http, constant,  Camera) {

		$scope.user = {};

		// Account setup

		$scope.addUserInfo = function() {
			$http.put(constant.API_BASE_URL + '/api/user/setup', $scope.user);
			$state.go('tab.views-map');
		}

		$scope.showProfile = function() {
			$http.get(constant.API_BASE_URL + '/api/user/show').success(function(response) {
				$scope.displayName = response;
			})
		}

		// Log User out

		$scope.logUserOut = function() {
			$http.get(constant.API_BASE_URL + '/api/user/logout')
			.success(function(response) {
				if (response === "logged out") {
					$state.go('login');
				} else {
					console.log(response);
				}
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