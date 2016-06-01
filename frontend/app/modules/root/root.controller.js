piluchoApp.controller("rootController", function ($scope, $rootScope, $window, deviceDetector) {
	$scope.agegate = true;

	$scope.isDesktop = deviceDetector.isDesktop();

	$scope.getAgeGate = function() {
		return null == localStorage.getItem('agegate');
	}

	$scope.setAgeGate = function() {
		localStorage.setItem('agegate', true);
	}

	$scope.clickNO = function() {
		$window.location.href = '//www.google.cl';
	}
});
