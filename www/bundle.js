(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var constant = require('./config/constants');

angular.module('app', ['ionic',

                        'auth.controller', 
                        'view.controller', 
                        'user.controller', 
                        
                        'camera.factory'])

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

.constant('constant', constant.GLOBAL)

.config(function($stateProvider, $urlRouterProvider) {

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

  .state('tab.views-map-new', {
    url: '/views-map-new',
    views: {
      'tab-views-map': {
        templateUrl: 'app/view/map-new.html',
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

  .state('tab.views-list-new', {
    url: '/views-list-new',
    views: {
      'tab-views-list': {
        templateUrl: 'app/view/list-new.html',
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
    url: '/profile-edit',
    views: {
      'tab-profile': {
        templateUrl: 'app/user/profile-edit.html',
        controller: 'UserController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/views-map');

});

},{"./config/constants":2}],2:[function(require,module,exports){
const constant = {
	GLOBAL: {
		API_BASE_URL: 'http://localhost:3000'
	}
};

module.exports = constant;
},{}]},{},[1]);