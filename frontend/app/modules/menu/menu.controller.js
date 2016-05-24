piluchoApp.controller("menuController", function ($scope, $rootScope) {
	$scope.toppage = true;

	$('#content').scroll(function() {
		if ($(this).scrollTop() > 0)
			$scope.toppage = false;
		else
			$scope.toppage = true;
		
		$rootScope.windowPosY = $(this).scrollTop();
		$scope.$apply();
	});

});
