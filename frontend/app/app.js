'use strict';

var piluchoApp = angular.module("piluchoApp",["ngRoute", "ui.bootstrap", "ng-backstretch", "ezfb", "ng.deviceDetector", "angulartics", "angulartics.google.analytics", "angular-clipboard", "ngAnimate"]);

/**
 *  Main App Controller
 **/

piluchoApp.controller('mainController', ['$rootScope', 'Compartir', '$location', function ($scope, $rootScope, Compartir, $location) {
	$rootScope.userLogin = false;
	$rootScope.userRecord = false;
	$rootScope.getPath = function(id) {
		var url = $location.protocol() + "://" + $location.host() + ":" + $location.port();
		if (id) url += '/ver/' + id;
		return url;
	}

	$rootScope.shareFB = function(id) {
		Compartir.fb(id);
	}

	$rootScope.shareTW = function(id) {
		Compartir.tw(id);
	}

}]);
