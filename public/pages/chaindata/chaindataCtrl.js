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

        //called form ng-disabled form the list of buttons on the chain data page
        $scope.checkifUserCanAccess = function(role){
          for (var i = 0; i < $scope.user.roles.length; i++) {
            if($scope.user.roles[i].id == role.id){ //user has this role
              return false; //returning false because checking if the button should be disabled
            }else{
              return true; //user doesnt have this role return true to disable button
            }
          }
        }
  }]);
