angular.module('view.controller', [])
	.controller('ViewController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.view = {};
		if (localStorage['User-Data'] !== undefined) {
			$scope.user = JSON.parse(localStorage['User-Data']);
		}

		$scope.uploadView = function() {
			var request = {
				userId: $scope.user._id,
				description: $scope.view.description
			}

			$http.post('/api/view/post', request).success(function(response) {

			}).error(function(err) {
				console.error(err);
			});
		}

		$scope.getAllViews = function() {
			$scope.views = {};

			$http.get('/api/view/get').success(function(response) {
				$scope.views = response
			}).error(function(err) {
				console.error(err);
			});

		}

	}]);