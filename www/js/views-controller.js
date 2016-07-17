angular.module('views.controller', [])

.controller('ViewsCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('/viewlist').success(function(response) {
		console.log("I got the data requested");

		$scope.viewlist = response;
	});
}]);