'use strict';

var piluchoAdminAPP = angular.module("piluchoAdminAPP",["ngRoute","ui.bootstrap"]);

/**
 *  Main App Controller
 **/

piluchoAdminAPP.controller('mainController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		return active;
	};
}]);
