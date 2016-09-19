// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyADie9VF6XTp7sjZ2TOGrkeRx3Y8AaRA9Y",
  authDomain: "streetview-16746.firebaseapp.com",
  databaseURL: "https://streetview-16746.firebaseio.com",
  storageBucket: "streetview-16746.appspot.com",
};
firebase.initializeApp(config);


angular.module('app', ['ionic', 'ngCordova', 'firebase'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // Authentication views

    .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthenticationController'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthenticationController'
    })

    .state('forgot', {
        url: '/forgot',
        templateUrl: 'app/auth/forgot.html',
        controller: 'AuthenticationController'
    })

    // Account setup

    .state('setup', {
        url: '/setup',
        templateUrl: 'app/user/setup.html',
        controller: 'UserController'
    })

    // Tab Navigation Abstract
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/nav/tabs.html'
    })

    // Tabbed views:

    .state('tab.views-map', {
        url: '/views-map',
        views: {
            'tab-views-map': {
                templateUrl: 'app/view/map.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.views-new', {
        url: '/views-map/new',
        views: {
            'tab-views-map': {
                templateUrl: 'app/view/new.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.views-list', {
        url: '/views-list',
        views: {
            'tab-views-list': {
                templateUrl: 'app/view/list.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.list-detail', {
        url: '/views-list/:id',
        views: {
            'tab-views-list': {
                templateUrl: 'app/view/list-detail.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.views-edit', {
        url: '/views-list/:id/edit',
        views: {
            'tab-views-list': {
                templateUrl: 'app/view/edit.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'app/user/profile.html',
                controller: 'UserController'
            }
        }
    })

    .state('tab.profile-edit', {
        url: '/profile/edit',
        views: {
            'tab-profile': {
                templateUrl: 'app/user/edit.html',
                controller: 'UserController'
            }
        }
    })

    .state('tab.uploads', {
        url: '/profile/uploads',
        views: {
            'tab-profile': {
                templateUrl: 'app/user/uploads.html',
                controller: 'ViewController'
            }
        }
    })

    .state('tab.uploads-edit', {
        url: '/profile/uploads/:id/edit',
        views: {
            'tab-profile': {
                templateUrl: 'app/user/uploads-edit.html',
                controller: 'ViewController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
