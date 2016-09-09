angular.module('app')
	.controller('ViewController', ['$scope', '$state', '$stateParams', '$http', 'constant', function($scope, $state, $stateParams, $http, constant) {

		// Post view to server

		$scope.view = {};
		$scope.types = ['Graffiti', 'Painting', 'Sculpture', 'Stencil', 'Other'];

		$scope.uploadView = function() {
			var user = firebase.auth().currentUser,
			viewData = {
				user: user.displayName,
				artType: $scope.view.artType,
				description: $scope.view.description,
				dateAdded: 1-Date.now()
			},
			newPostKey = firebase.database().ref().child('views').push().key,
			updates = {};

			updates['/views/' + newPostKey] = viewData;
			firebase.database().ref().update(updates);

			$state.go('tab.views-list');
		}

		// Initialize all views and allow pull to refresh

		$scope.doRefresh = function() {
		    var allViews = [];
			firebase.database().ref('views/').orderByChild('dateAdded').once('value', function(snapshot) {
				snapshot.forEach(function(ss) {
					allViews.push(ss.val());
				})
			  	$scope.views = allViews;
			}, function(errorObject) {
				console.log(errorObject.code);
			});
			$scope.$broadcast('scroll.refreshComplete');
		}
	}]);