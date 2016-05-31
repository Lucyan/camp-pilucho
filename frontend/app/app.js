'use strict';

var piluchoApp = angular.module("piluchoApp",["ngRoute", "ui.bootstrap", "ng-backstretch", "ezfb", "ng.deviceDetector", "angulartics", "angulartics.google.analytics", "angular-clipboard"]);

/**
 *  Main App Controller
 **/

piluchoApp.controller('mainController', ['$rootScope', 'Compartir', '$location', function ($rootScope, Compartir, $location) {
	$rootScope.userLogin = false;
	$rootScope.userRecord = false;
	$rootScope.absUrl = $location.absUrl();

	$rootScope.shareFB = function() {
		Compartir.fb();
	}

	$rootScope.shareTW = function() {
		Compartir.tw();
	}

}]);
