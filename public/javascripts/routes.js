/*global angular*/
angular.module('app')
    .config(['$routeProvider', function($routeProvider) {

      //function to get called everytime a use hits a new page
      //checks to see if they have a valid session
      //if status code is 403 it means they are not logged in so
      //redirect to the login page using the $window libary
      var isAuthenticated = function($http, $window, $rootScope){
        $http.get('/authenticated').then(function(res){
          if(res.data.status == 403){ //not a valid session/not logged in
            return $window.location.href = "#/login";
          }
          return $rootScope.globalUser = res.data;
        });
      }
        $routeProvider
            //home page
            .when('/', {
                templateUrl: '../pages/home/home.html',
                controller: 'HomeController',
                resolve:{
                  isAuthenticated:isAuthenticated //user must be logged in to continue
                }
            })
            //login page
            .when('/login', {
                templateUrl: '../pages/login/login.html',
                controller: 'LoginController',
                resolve:{
                  isAuthenticated:isAuthenticated //user must be logged in to continue
                }
            })
            //chain data page
            .when('/chain/view/data', {
                templateUrl: '../pages/chaindata/chaindata.html',
                controller: 'ChainDataController',
                resolve:{
                  isAuthenticated:isAuthenticated //user must be logged in to continue
                }
            })
            //go to the homepage
            .otherwise({
                redirectTo: '/'
            });
    }]);
