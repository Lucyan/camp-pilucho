'use strict';

var piluchoApp = angular.module("piluchoApp",["ngRoute", "ui.bootstrap", "ng-backstretch", "ezfb", "ng.deviceDetector"]);

/**
 *  Main App Controller
 **/

piluchoApp.controller('mainController', ['$rootScope', function ($rootScope) {
	$rootScope.userLogin = false;
	$rootScope.userRecord = false;
}]);
