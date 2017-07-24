angular.module('app').controller('ChainDataController', ['$scope', '$http', '$location', '$route', '$window',
      function($scope, $http, $location, $route, $window){

        $scope.user;
        $scope.roles = [];

        //get the currently logged in user
        $http.get('/user').then(function(res){
          $scope.user = res.data;
        });

        //get a list of roles from the database
        //currently the backend returns a hard coded list of roles will need to be changed
        $http.get('/get/roles').then(function(res){
          $scope.roles = res.data;
        });

        $scope.checkifUserCanAccess = function(role){
          if($scope.user.roles.indexOf(role.name)){
            return true;
          }else{
            return false;
          }
        }

        //called when user clicks a button
        $scope.redirectToChainCode = function(role){
          if($scope.checkifUserCanAccess(role.name)){
            $window.location.href = "#/chain/view/data/" + role.name;
          }
        }
  }]);
