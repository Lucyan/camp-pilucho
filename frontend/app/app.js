'use strict';

var piluchoApp = angular.module("piluchoApp",["ngRoute", "ui.bootstrap", "ng-backstretch", "ezfb", "ng.deviceDetector", "angulartics", "angulartics.google.analytics"]);

/**
 *  Main App Controller
 **/

piluchoApp.controller('mainController', ['$rootScope', function ($rootScope) {
	$rootScope.userLogin = false;
	$rootScope.userRecord = false;
}]);
