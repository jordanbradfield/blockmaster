angular.module('app').controller('ViewChainDataController', ['$scope', '$http', '$location', '$route', '$window',
      function($scope, $http, $location, $route, $window){

        $scope.user;
        $scope.role; //current role
        $scope.roleId = $route.current.params.id; //id that was passed in the url for the role id
        $scope.chaindata;

        //get current user
        $http.get('/user').then(function(res){
          $scope.user = res.data;
        });

        //get the current role from the database
        //currently returning hardcoded data
        $http.get('/role/' + $scope.roleId).then(function(res){
          $scope.role = res.data;
        });

        $http.get('/query/chain/' + $scope.roleId).then(function(res){
          console.log(res.data);
        });
  }]);
