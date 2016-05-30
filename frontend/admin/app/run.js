piluchoAdminAPP.run(function (User, $window){

	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch(function() {
				if (!User.data.is_admin) $window.location.href = '/';
			});
		} else {
			$window.location.href = '/';
		}
	});

});
