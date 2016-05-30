piluchoAdminAPP.config(function ($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',
  {
    templateUrl: 'app/modules/home/home.template.html',
    controller: 'homeController'
  })
  .when('/static-page',
  {
    templateUrl: 'app/modules/staticPage/staticPage.template.html'
  })
  .otherwise({
    redirectTo: '/'
  });

});
