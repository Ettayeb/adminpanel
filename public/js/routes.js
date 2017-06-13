angular.module("routes", []).config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html',
    requireAdminLogin: true,
    title: 'Home'
  }).when('/register', {
    templateUrl: '/views/register.html',
    requireAdminLogin: true
  }).when('/login', {
    templateUrl: 'views/login.html',
    requireAdminLogin: false
  }).when('/users', {
    templateUrl: 'views/users.html',
    requireAdminLogin: true,
  }).when('/companies', {
    templateUrl: 'views/companies.html',
    requireAdminLogin: true,
  })
  .when('/offers', {
    templateUrl: '/views/offers.html',
    requireAdminLogin: true,
  });
 //.otherwise('/');    
  $locationProvider.html5Mode(true);
})
.run(function($rootScope, $location, $route, adminAuth) {
  $rootScope.$on("$locationChangeStart", function(event, next, current) {
    if ($route.routes[$location.path()]) {
      console.log(adminAuth.isLoggedIn());
      
      if ( $route.routes[$location.path()].requireAdminLogin && !adminAuth.isLoggedIn() ) {
          event.preventDefault();
          $location.path('/login');
        }
      }
  });
})
.filter('start', function() {
  return function(input, start) {
    if (!input || !input.length) {
      return;
    }
    start = +start;
    return input.slice(start);
  };
});