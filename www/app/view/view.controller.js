angular.module('app')
	.controller('ViewController', ['$scope', '$state', '$stateParams', '$http', '$firebaseArray', '$firebaseObject', function($scope, $state, $stateParams, $http, $firebaseArray, $firebaseObject) {

		// Post view to server

		$scope.view = {};
		$scope.types = ['Graffiti', 'Painting', 'Sculpture', 'Stencil', 'Other'];

		$scope.uploadView = function() {
			var user = firebase.auth().currentUser,
			viewData = {
				user: user.displayName,
				artType: $scope.view.artType,
				description: $scope.view.description,
				dateAdded: Date.now()
			},
			newPostKey = firebase.database().ref().child('views').push().key,
			updates = {};

			updates['/views/' + newPostKey] = viewData;
			firebase.database().ref().update(updates);

			$state.go('tab.views-list');
		}

		// Initialize Views List and allow pull to refresh

		$scope.doRefresh = function() {
		    var ref = firebase.database().ref('views/');
			
			$scope.views = $firebaseArray(ref);
			$scope.$broadcast('scroll.refreshComplete');
		}

		// Initialize View Detail

		$scope.getDetail = function() {
			var ref = firebase.database().ref('views/');

			$scope.viewDetail = $firebaseObject(ref.child($stateParams.id));
		}
		
	}]);