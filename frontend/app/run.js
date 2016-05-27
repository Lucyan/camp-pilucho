piluchoApp.run(function (User){
	User.checkSession(function(isLogin) {
		if (isLogin) {
			User.fetch();
		}
	});

	Dancer.setOptions({
		flashJS  : 'lib/lialosiu-dancer/lib/soundmanager2.js',
		flashSWF : 'lib/lialosiu-dancer/lib/soundmanager2.swf'
	});

});
