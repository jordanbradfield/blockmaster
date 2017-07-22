angular.module('app').controller('LoginController', ['$scope', '$http', '$location', '$route', '$window',
    function($scope, $http, $location, $route, $window) {

      $scope.username; //users login id
      $scope.password; //users password

      /* HARDCODED ROLES, WILL BE CHANGED ONCE WE CAN TALK TO THE DATABASE AND GET THEM THERE */
      $scope.roles = [
        {
          id:"abcd"
        }
      ]

      $scope.login = function(){
        $http.post('/login', {uname:$scope.username, secret:$scope.password, roles:$scope.roles}).then(function(res){
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
