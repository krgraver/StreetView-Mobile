angular.module('view.controller', [])
	.controller('ViewController', ['$scope', '$state', '$http', function($scope, $state, $http) {

		$scope.view = {};
		if (localStorage['User-Data'] !== undefined) {
			$scope.user = JSON.parse(localStorage['User-Data']);
		}

		$scope.types = ['Graffiti', 'Painting', 'Sculpture', 'Stencil', 'Other'];

		// Post view to server

		$scope.uploadView = function() {
			var request = {
				userId: $scope.user._id,
				userFirstName: $scope.user.firstName,
				userLastName: $scope.user.lastName,
				description: $scope.view.description,
				artType: $scope.view.artType
			}

			$http.post('/api/view/post', request).success(function(response) {

			}).error(function(err) {
				console.error(err);
			});

			$state.go('tab.views-list');
		}

		// Initialize all views and allow pull to refresh

		$scope.doRefresh = function() {
    $http.get('/api/view/get')
     .success(function(allViews) {
       $scope.views = allViews;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };


	}]);