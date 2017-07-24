angular.module('app').controller('LoginController', ['$scope', '$http', '$location', '$route', '$window',
    function($scope, $http, $location, $route, $window) {

      $scope.username; //users login id
      $scope.password; //users password

      $scope.login = function(){
        $http.post('/login', {uname:$scope.username, secret:$scope.password,
          args:[$scope.username, $scope.password]}).then(function(res){
          console.log(res.data);
          if(res.data.uname){
            $window.location.href = "#/"
          }else{
            $route.reload();
          }
        });
      }


    }
]);
