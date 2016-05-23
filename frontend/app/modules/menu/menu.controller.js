piluchoApp.controller("menuController", function ($scope) {
	$scope.toppage = true;

	$('#content').scroll(function() {
		if ($(this).scrollTop() > 0)
			$scope.toppage = false;
		else
			$scope.toppage = true;
		 
		$scope.$apply();
	});

});
