(function () {

    angular.module('app').config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

        $urlMatcherFactoryProvider.strictMode(false); // Trailing slash optional for all routes
        // $locationProvider.html5Mode(true);

        $stateProvider.state('root', {
            url: '^',
            abstract: true,
            templateUrl: 'app/template/layout.html',
        })
        .state('root.home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        })
        .state('root.city', {
            url: '/city/:lat,:lon',
            templateUrl: 'app/city/city.html',
            controller: 'CityCtrl'
        })
        .state('404', {
            url: '/*path',
            templateUrl: 'app/template/404.html'
        });

        $urlRouterProvider.otherwise('/');

    }]);

})();
