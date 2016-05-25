piluchoApp.run(function (User){
	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch();
		}
	});
});
