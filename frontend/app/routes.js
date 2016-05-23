piluchoApp.config(function ($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',
  {
    templateUrl: 'app/modules/root/main.template.html',
    controller: 'rootController'
  })
  .when('/static-page',
  {
    templateUrl: 'app/modules/staticPage/staticPage.template.html'
  })
  .otherwise({
    redirectTo: '/'
  });

});
