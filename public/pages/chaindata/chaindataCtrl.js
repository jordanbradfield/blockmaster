angular.module('app').controller('ChainDataController', ['$scope', '$http', '$location', '$route', '$window',
      function($scope, $http, $location, $route, $window){

        $scope.user;
        $scope.roles = [];

        $http.get('/user').then(function(res){
          $scope.user = res.data;
        });

        $http.get('/get/roles').then(function(res){
          console.log(res.data);
          $scope.roles = res.data;
        });

        $scope.checkifUserCanAccess = function(role){
          for (var i = 0; i < $scope.user.roles.length; i++) {
            if($scope.user.roles[i].id == role.id){ //user has this role
              return false; //returning false because checking if the button should be disabled
            }else{
              return true; //user doesnt havr this role return true to disable button
            }
          }
        }
  }]);
