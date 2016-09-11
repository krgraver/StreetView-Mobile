angular.module('app')
	.controller('ViewController', ['$scope', '$state', '$stateParams', '$http', '$firebaseArray', '$firebaseObject', 'Camera', function($scope, $state, $stateParams, $http, $firebaseArray, $firebaseObject, Camera) {

		// Post view to server

		$scope.view = {};
		$scope.types = ['Graffiti', 'Painting', 'Sculpture', 'Stencil', 'Other'];

		$scope.uploadView = function() {
			var user = firebase.auth().currentUser,
			viewData = {
				photoURL: $scope.view.photoURL,
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

		// Take View pic

		$scope.getViewPic = function (options) {
	
	    	var options = {
		        quality : 75,
		        targetWidth: 200,
		        targetHeight: 200,
		        sourceType: 1
	    	};

	    	Camera.getPicture(options).then(function(imageData) {
	        	$scope.view.photoURL = imageData;;
	    	}, function(err) {
	        	console.log(err);
	    	});
	    };

		// Initialize Views List and allow pull to refresh

		$scope.doRefresh = function() {
		    var ref = firebase.database().ref('views/');
			
			$scope.views = $firebaseArray(ref);
			$scope.$broadcast('scroll.refreshComplete');
		}

		// Initialize View Detail

		$scope.getDetail = function() {
			$scope.currentUser = firebase.auth().currentUser;
			var ref = firebase.database().ref('views/');

			$scope.viewDetail = $firebaseObject(ref.child($stateParams.id));
		}

		// Edit View

		$scope.newInfo = {};
		$scope.updateView = function() {
			var ref = firebase.database().ref('views/' + $stateParams.id);
			ref.update({ description: $scope.newInfo.description});
		}

		$scope.deleteView = function() {
			var ref = firebase.database().ref('views/' + $stateParams.id);
			ref.remove();
		}

		// Google Maps

		$scope.initMap = function() {
		    var options = {
		    	timeout: 10000,
		    	enableHighAccuracy: true
		    };

		    function success(position) {
		    	var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		    	var mapOptions = {
		      		center: latLng,
		      		zoom: 15,
		      		mapTypeId: google.maps.MapTypeId.ROADMAP,
		      		styles: [
			            {
			              	featureType: 'all',
			              	stylers: [
			                	{ saturation: -80 }
			              	]
			            },{
			              	featureType: 'road.arterial',
			              	elementType: 'geometry',
			              	stylers: [
			                	{ hue: '#00ffee' },
			                	{ saturation: 50 }
			              	]
			            },{
			              	featureType: 'poi.business',
			              	elementType: 'labels',
			              	stylers: [
			                	{ visibility: 'off' }
			              	]
			            }
			        ]
		    	};

		    	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		    	var image = 'assets/images/me-marker.svg'
		    	var meMarker = {
			    	position: latLng,
			    	map: $scope.map,
			    	icon: image,
			    	title: 'My Position'
				};

		    	$scope.meMarker = new google.maps.Marker(meMarker);
		    };

		    function error(err) {
		    	console.log(err.message);
		    };

		    navigator.geolocation.getCurrentPosition(success, error, options);

		}
		
	}]);