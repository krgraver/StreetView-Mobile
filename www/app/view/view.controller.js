angular.module('view.controller', [])
	.controller('ViewController', ['$scope', '$state', '$http', 'constant', function($scope, $state, $http, constant) {

		$scope.view = {};

		$scope.types = ['Graffiti', 'Painting', 'Sculpture', 'Stencil', 'Other'];

		// Post view to server

		$scope.uploadView = function() {
			var request = {
				artType: $scope.view.artType,
				description: $scope.view.description
			}

			$http.post(constant.API_BASE_URL + '/api/view/post', request);

			$state.go('tab.views-list');
		}

		// Initialize all views and allow pull to refresh

		$scope.doRefresh = function() {
		    $http.get(constant.API_BASE_URL + '/api/view/get')
		    	.success(function(allViews) {
		     		$scope.views = allViews;
		    	})
		    	.finally(function() {
		       // Stop the ion-refresher from spinning
		     	$scope.$broadcast('scroll.refreshComplete');
		    });
		}
	}]);