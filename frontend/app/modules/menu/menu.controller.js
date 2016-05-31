piluchoApp.controller("menuController", function ($scope, $rootScope, User) {
	$scope.toppage = true;
	$scope.toggleClassMenuMovil = false;

	$('#content').scroll(function() {
		if ($(this).scrollTop() > 0)
			$scope.toppage = false;
		else
			$scope.toppage = true;
		
		$rootScope.windowPosY = $(this).scrollTop();
		$scope.$apply();
	});

	$rootScope.goTo = function($event) {
		$event.preventDefault();
		$scope.toggleClassMenuMovil = false;
		var positionNow = $($($event.currentTarget).attr('href')).offset().top + $('#content').scrollTop();
		if (positionNow > 0) positionNow -= 62;
		$('#content').animate({ scrollTop: positionNow }, 600);
		if ($($event.currentTarget).attr('href') == '#home') {
			$('#home button.facebook').addClass('active');
			setTimeout(function() {
				$('#home button.facebook').removeClass('active');
			}, 200);
		}
	}

	$scope.isActive = function(id) {
		if ($(id).length > 0 && ($(id).offset().top - 63) < 0 && ($(id).offset().top * -1) < ($(id).height() + 63)) return true;
		return false;
	}

	$scope.userData = false;

	$rootScope.$watch('userLogin', function(newValue, oldValue) {
		if (newValue) {
			$scope.userData = User.data;
		} else {
			$scope.userData = false;
		}
	});


	$scope.logout = function() {
		User.logout();
	}

	$scope.toggleMenuMovil = function() {
		$scope.toggleClassMenuMovil = ($scope.toggleClassMenuMovil) ? false : true;
	}

});
