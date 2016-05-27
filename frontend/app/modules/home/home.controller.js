piluchoApp.controller("homeController", function ($scope, User, $rootScope) {
	$scope.login = function() {
		$scope.loader = true;
		User.login(function() {
			$scope.loader = false;
		});
	}

	$scope.grabar = function() {
		$rootScope.userRecord = true;
	}

	$scope.loader = true;

	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch(function() {
				$scope.loader = false;
			});
		} else {
			$scope.loader = false;
		}
	});
});
