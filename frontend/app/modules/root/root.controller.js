piluchoApp.controller("rootController", function ($scope, $window, Compartir) {
	$scope.agegate = true;

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
