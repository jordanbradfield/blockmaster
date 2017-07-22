angular.module('app').controller('LoginController', ['$scope', '$http', '$location', '$route', '$window',
    function($scope, $http, $location, $route, $window) {

      $scope.username; //users login id
      $scope.password; //users password

      $scope.login = function(){
        console.log($scope.username, $scope.password);
      }


    }
]);
