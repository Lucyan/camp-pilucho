piluchoAdminAPP.run(function (User, $window, $rootScope){

	$rootScope.view_app = false;

	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch(function() {
				if (!User.data.is_admin) {
					$window.location.href = '/';
				} else {
					$rootScope.view_app = true;
				}
			});
		} else {
			$window.location.href = '/';
		}
	});

});
