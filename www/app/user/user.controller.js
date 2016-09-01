angular.module('user.controller', [])
	.controller('UserController', ['$scope', '$state', '$http', 'Camera', function($scope, $state, $http, Camera) {

		$scope.user = JSON.parse(localStorage['User-Data']);

		// Account setup

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