angular.module('app').controller('HomeController', ['$scope', '$http', '$location', '$route', '$window',
    function($scope, $http, $location, $route, $window) {

      $scope.user;

      $http.get('/user').then(function(res){
        $scope.user = res.data;
      });

    }
]);
