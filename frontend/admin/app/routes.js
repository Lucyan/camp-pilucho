piluchoAdminAPP.config(function ($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/',
	{
		templateUrl: 'app/modules/home/home.template.html',
		controller: 'homeController'
	})
	.when('/sorteos',
	{
		templateUrl: 'app/modules/sorteos/sorteos.template.html',
		controller: 'sorteosController'
	})
	.otherwise({
		redirectTo: '/'
	});

});
