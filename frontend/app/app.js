'use strict';

var piluchoApp = angular.module("piluchoApp",["ngRoute", "ui.bootstrap", "ng-backstretch", "ezfb", "ng.deviceDetector", "angulartics", "angulartics.google.analytics"]);

/**
 *  Main App Controller
 **/

piluchoApp.controller('mainController', ['$rootScope', 'Compartir', function ($rootScope, Compartir) {
	$rootScope.userLogin = false;
	$rootScope.userRecord = false;

	$rootScope.shareFB = function() {
		Compartir.fb();
	}

	$rootScope.shareTW = function() {
		Compartir.tw();
	}

}]);
