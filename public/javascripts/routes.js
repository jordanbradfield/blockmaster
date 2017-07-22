/*global angular*/
angular.module('app')
    .config(['$routeProvider', function($routeProvider) {

      var checkAuth = function($http, user, $rootScope, $route, $location, $window){

      }
        $routeProvider
            //home page
            .when('/', {
                templateUrl: '../pages/home/home.html',
                controller: 'HomeController'
            })
            //login page
            .when('/login', {
                templateUrl: '../pages/login/login.html',
                controller: 'LoginController'
            })
            //chain data page
            .when('/chain/view/data', {
                templateUrl: '../pages/chaindata/chaindata.html',
                controller: 'ChainDataController'
            })
            //go to the homepage
            .otherwise({
                redirectTo: '/'
            });
    }]);
