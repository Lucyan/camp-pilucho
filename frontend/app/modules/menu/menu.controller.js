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

	$scope.goTo = function($event) {
		$event.preventDefault();
		var positionNow = $($($event.currentTarget).attr('href')).offset().top + $('#content').scrollTop();
		if (positionNow > 0) positionNow -= 62;
		console.log('scroll to', $($event.currentTarget).attr('href'), positionNow);
		$('#content').animate({ scrollTop: positionNow }, 600);
	}

	$scope.isActive = function(id) {
		if ($(id).length > 0 && ($(id).offset().top - 63) < 0 && ($(id).offset().top * -1) < ($(id).height() + 63)) return true;
		return false;
	}

});
