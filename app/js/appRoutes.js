angular.module('appRoutes', [])

	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			// default page
			.when('/', {
				template: '<div><login-form></login-form></div>'
			})

			// login page
			.when('/login', {
				template: '<div><login-form></login-form></div>'
			})

			// home page
			.when('/home', {
				template: '<div><home-form></home-form></div>'
			})
			
			.when('/detail/:movieId', {
				template: '<div><detail-form></detail-form></div>'
			})

			.otherwise({
				redirectTo: '/login'
			});

		// To eliminate # characters from urls (eg. www.google.com/#/login)
		$locationProvider.html5Mode(true);
	}]);
